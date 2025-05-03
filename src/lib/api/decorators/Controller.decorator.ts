import {DecoratorsUtils} from "../utils/Decorators.utils";
import {EndpointOptions} from "./Endpoint.decorator";

export interface ControllerDecoratorOptions {
  private?: boolean;
}

const generateRouteRegex = (path: string): {keys: string[]; regex: RegExp} => {
  // Remove trailing slash from path
  path = path.replace(/\/$/, "");

  const keys: string[] = [];

  const regexString = path
    .replace(/\/:(\w+)/g, (_match, key) => {
      keys.push(key);

      return `/([^/]+)`;
    })
    .replace(/\//g, "\\/");

  const finalRegex = new RegExp(`^${regexString}$`);

  return {
    keys,
    regex: finalRegex,
  };
};

export const Controller = (
  route: string,
  options?: ControllerDecoratorOptions
): ClassDecorator => {
  return (target) => {
    DecoratorsUtils.defineMetadata("controller", options, target, "controller");

    const endpointsMetadata = Reflect.getMetadataKeys(target, "endpoint");

    for (let i = 0; i < endpointsMetadata.length; i++) {
      const endpointMetadata: EndpointOptions = Reflect.getMetadata(
        endpointsMetadata[i],
        target,
        "endpoint"
      );

      if (endpointMetadata) {
        const completeRoute = `${route}${endpointMetadata.route}`;
        const {keys: routeParams, regex: completeRouteRegex} =
          generateRouteRegex(completeRoute);

        DecoratorsUtils.defineMetadata(
          endpointsMetadata[i],
          {
            ...endpointMetadata,
            route: `${route}${endpointMetadata.route}`,
            routeParams,
            routeRegex: completeRouteRegex,
          },
          target,
          "endpoint"
        );
      }
    }
  };
};
