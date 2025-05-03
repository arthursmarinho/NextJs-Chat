import {NodeConfig} from "@/lib/shared/config/Node.config";
import {routesByMethod} from "@/lib/shared/constants/ApiRoutes.gen";
import {ApiResponse, ApiResponseError} from "@/lib/shared/types/Api.types";
import {ApiError} from "next/dist/server/api-utils";
import {NextRequest, NextResponse} from "next/server";

const handleError = (
  req: NextRequest,
  context: unknown,
  error: ApiError
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    [
      {
        details: {
          req: {
            body: req.body,
            context,
            headers: req.headers,
            method: req.method,
            query: parseQueryParams(req.nextUrl.searchParams),
            url: req.url,
          },
        },
        message: error?.message,
        timestamp: Date.now(),
      } as ApiResponseError,
    ] as ApiResponse<ApiResponseError[]>,
    {
      status: error.statusCode,
    }
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const handleMethod = (handler: Function) => {
  return async (req: NextRequest, context: unknown): Promise<NextResponse> => {
    try {
      return await handler(req, context);
    } catch (error) {
      // if (NodeConfig.isDevEnv()) {
      //   console.debug({
      //     error: (error as {message: string} | undefined)?.message || "",
      //     message: "Error during endpoint execution",
      //     req: {
      //       body: req.body,
      //       headers: req.headers,
      //       method: req.method,
      //       url: req.url,
      //     },
      //   });
      // }

      return handleError(req, context, error as ApiError);
    }
  };
};

const parseQueryParams = (
  urlSearchParams: URLSearchParams
): Record<string, unknown> => {
  const params: Record<string, unknown> = {};

  urlSearchParams.forEach((value: string, key: string) => {
    try {
      params[key] = JSON.parse(value);
    } catch (_) {
      params[key] = value;
    }
  });

  return params;
};

const setCacheHeaders = (
  response: NextResponse,
  maxLifeMs: number
): NextResponse => {
  const maxLifeSeconds = Math.floor(maxLifeMs / 1000);

  response.headers.set("Cache-Control", `max-age=${maxLifeSeconds}`);

  return response;
};

export const ApiUtils = {
  handleError,
  handleMethod,
  parseQueryParams,
  setCacheHeaders,
};
