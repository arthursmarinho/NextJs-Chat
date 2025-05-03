import {UserService} from "@/lib/shared/constants/ApiClient.gen";
import {ApiPaginationParamsDto} from "@/lib/shared/dtos/api/ApiPaginationParams.dto";
import {
  ApiEndpointDataType,
  ApiResponse,
  HttpMethod,
} from "@/lib/shared/types/Api.types";
import _ from "lodash";
import ms from "ms";
import {ApiError} from "next/dist/server/api-utils";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {performance} from "perf_hooks";

import {RequestContextManager} from "../helpers/RequestContextManager";
import {AuthService} from "../services/Auth.service";
import {ErrorWithMessage} from "../types/Error.types";
import {ApiUtils} from "../utils/Api.utils";
import {DecoratorsUtils} from "../utils/Decorators.utils";
import {ArgDecoratorName} from "./Args";
import {ControllerDecoratorOptions} from "./Controller.decorator";

interface CacheOptions {
  maxLife?: number;
  noStore?: boolean;
  public?: boolean;
  staleWhileRevalidate?: number;
}

interface EndpointDecoratorOptions {
  cache?: CacheOptions;
  private?: boolean;
  roles?: "admin"[];
}

export interface EndpointOptions {
  method: HttpMethod;
  route: string;
}

export interface EndpointMetadata {
  method: HttpMethod;
  route: string;
  routeParams: string[];
  routeRegex: RegExp;
  schemas: {
    body?: Function;
    params?: Function;
    query?: Function;
  };
}

export const Endpoint = (
  method: HttpMethod,
  route: string,
  options?: EndpointDecoratorOptions
): MethodDecorator => {
  options = {
    ...options,
  };

  return DecoratorsUtils.createMethodDecorator<ApiEndpointDataType>(
    (target, propertyKey, descriptor, next) => {
      DecoratorsUtils.defineMetadata(
        propertyKey.toString(),
        {
          method,
          route,
          schemas: {
            body: DecoratorsUtils.getArgumentSchema(
              "body",
              target,
              propertyKey
            ),
            params: DecoratorsUtils.getArgumentSchema(
              "params",
              target,
              propertyKey
            ),
            query: DecoratorsUtils.getArgumentSchema(
              "query",
              target,
              propertyKey
            ),
          },
        } as EndpointMetadata,
        target,
        "endpoint"
      );

      descriptor.value = async (
        ...originalArgs: [
          NextRequest,
          {params: Promise<Record<string, string>>}
        ]
      ) => {
        const startTime = performance.now();

        const req = originalArgs[0] as unknown as NextRequest;
        const nextResponse = NextResponse.json({}, {status: 200});
        const context: Record<string, string> = await originalArgs[1]?.params;
        const controllerOptions: ControllerDecoratorOptions =
          DecoratorsUtils.getMetadata("controller", target, "controller");
        const cookieStore = await cookies();
        const token =
          cookieStore.get("token")?.value ||
          req.headers.get("Authorization")?.split(" ")[1];
        const queryParams = ApiUtils.parseQueryParams(req.nextUrl.searchParams);
        const params = context || {};
        const {cache, isPrivate} = validateOptions(options, controllerOptions);

        if (isPrivate && !token) {
          console.warn({
            endpoint: propertyKey,
            message: "Unauthorized access attempt",
            url: req.nextUrl.pathname,
          });

          return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        // const userId = isPrivate ? AuthService.extractUserId(token) : null;
        const userId = await AuthService.extractUserIdFromSsoToken(token);

        if (options?.roles && userId) {
          const userRoles: string[] = [];
          const hasRequiredRole = options.roles.some((role) =>
            userRoles.includes(role)
          );

          if (!hasRequiredRole) {
            console.warn({
              endpoint: propertyKey,
              message: "Access denied due to insufficient roles",
              requiredRoles: options.roles,
              url: req.nextUrl.pathname,
              userId,
              userRoles,
            });

            return NextResponse.json({error: "Forbidden"}, {status: 403});
          }
        }

        const argumentNameWithGetter: Record<
          ArgDecoratorName,
          Parameters<typeof DecoratorsUtils.applyArgumentDecorator>[4]
        > = {
          body: async () => {
            try {
              return await req.json();
            } catch (_) {
              return null;
            }
          },
          cookies: () => cookieStore,
          pagination: () =>
            (queryParams as unknown as ApiPaginationParamsDto)?.pagination || {
              skip: undefined,
              sort: undefined,
              take: undefined,
            },
          params: () => params,
          query: () => queryParams,
          req: () => req,
          res: () => nextResponse,
          userId: async () => userId,
        };

        const args: [] = [];

        await Promise.all(
          Object.entries(argumentNameWithGetter).map(
            async ([argumentName, getter]) => {
              try {
                await DecoratorsUtils.applyArgumentDecorator(
                  args,
                  target,
                  propertyKey,
                  argumentName as ArgDecoratorName,
                  getter
                );
              } catch (error) {
                console.error({
                  endpoint: propertyKey,
                  error: (error as ErrorWithMessage).message,
                  message: `Error applying decorator for argument: ${argumentName}`,
                });

                throw new ApiError(
                  400,
                  (error as ErrorWithMessage).message ||
                    "An error occurred while validating argument"
                );
              }
            }
          )
        );

        let result: ApiEndpointDataType = null;
        let controllerExecutionDuration: number = 0;

        try {
          await RequestContextManager.run({userId}, async () => {
            const controllerExecutionStartTime = performance.now();

            result = await next(args);
            controllerExecutionDuration =
              performance.now() - controllerExecutionStartTime;
          });
        } catch (error) {
          console.error({
            endpoint: propertyKey,
            error: (error as ErrorWithMessage).message,
            message: "Error during endpoint execution",
          });

          throw new ApiError(
            500,
            "An error occurred during endpoint execution"
          );
        }

        const response: ApiResponse = result;
        const finalResponse = NextResponse.json(response, {
          headers: nextResponse.headers,
          status: 200,
        });

        if (req.headers.get("x-invalidate-cache")) {
          finalResponse.headers.set("Cache-Control", "no-cache");
        } else if (cache?.noStore) {
          finalResponse.headers.set("Cache-Control", "no-store");
        } else if (cache?.maxLife !== undefined) {
          const maxLifeSeconds = Math.floor(cache.maxLife / 1000);
          let cacheControl = "must-revalidate";

          cacheControl += cache.public
            ? `max-age=0, s-maxage=${maxLifeSeconds}`
            : `max-age=${maxLifeSeconds}`;

          const staleSeconds = Math.floor(
            cache.staleWhileRevalidate || ms("1h") / 1000
          );

          cacheControl += `, stale-while-revalidate=${staleSeconds}`;

          if (cache.public) {
            cacheControl = `public, ${cacheControl}`;
          } else {
            cacheControl = `private, ${cacheControl}`;
          }

          finalResponse.headers.set("Cache-Control", cacheControl);
        } else {
          finalResponse.headers.set("Cache-Control", "no-cache");
        }

        const duration = performance.now() - startTime;

        console.info({
          callDuration: `${duration.toFixed(2)}ms`,
          controllerDuration: `${controllerExecutionDuration.toFixed(2)}ms`,
          endpoint: propertyKey,
          message: "Endpoint response",
          method: req.method,
          responseSize: JSON.stringify(response).length,
          status: finalResponse.status,
          url: req.nextUrl.pathname,
        });

        return finalResponse;
      };

      return descriptor;
    }
  );
};

const validateOptions = (
  options: EndpointDecoratorOptions | undefined,
  controllerOptions: ControllerDecoratorOptions
): {cache?: CacheOptions; isPrivate: boolean} => {
  let isPrivate: boolean = true;
  if (options?.private !== undefined) isPrivate = options.private;
  else if (controllerOptions?.private !== undefined)
    isPrivate = controllerOptions.private;

  return {
    cache: options?.cache,
    isPrivate,
  };
};
