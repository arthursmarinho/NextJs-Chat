import "reflect-metadata";
import {EndpointMetadata} from "@/lib/api/decorators/Endpoint.decorator";
import path from "path";
import {ModuleLoader} from "../helpers/ModuleLoader.helper";
import {ModuleWrite} from "../helpers/ModuleWrite.helper";

const skipProperties = ["constructor", "length", "name", "prototype", "caller"];

const getEndpointsRegistry = (controllers: Function[]) => {
  const registry: {
    controller: string;
    method: string;
    options: EndpointMetadata;
  }[] = [];

  for (const controller of controllers) {
    const instanceMethods = Object.getOwnPropertyNames(controller.prototype);
    const staticMethods = Object.getOwnPropertyNames(controller);
    for (const propertyName of [...instanceMethods, ...staticMethods]) {
      if (skipProperties.includes(propertyName)) continue;
      const isStatic = staticMethods.includes(propertyName);
      if (!isStatic) continue;
      const target = controller;
      const endpointMetadata: EndpointMetadata = Reflect.getMetadata(
        propertyName,
        target,
        "endpoint"
      );
      if (!endpointMetadata) continue;
      registry.push({
        controller: controller.name,
        method: propertyName,
        options: endpointMetadata,
      });
    }
  }

  return registry;
};

const generateDynamicRoutes = async () => {
  const controllersLoader = new ModuleLoader("controller");
  await controllersLoader.loadExports();
  const controllers = controllersLoader.exports;
  const controllersMap = controllersLoader.map;

  let registry = getEndpointsRegistry(controllers);

  const moduleWrite = new ModuleWrite(
    path.resolve("src/lib/shared/constants/ApiRoutes.gen.ts")
  );

  if (!controllersMap.size) {
    moduleWrite.save();
    return;
  }

  Array.from(controllersMap.entries()).forEach(([key, exports]) => {
    moduleWrite.pushImport(
      key,
      exports.map((exp) => exp.name)
    );
  });
  moduleWrite.pushBlankLine();

  const routesByMethod: Record<
    string,
    {handler: string; params: string[]; routeRegex: RegExp; route: string}[]
  > = {};

  for (const item of registry) {
    const {controller, method: handlerName, options} = item;
    const handler = `${controller}.${handlerName}`;

    if (!routesByMethod[options.method]) {
      routesByMethod[options.method] = [];
    }

    routesByMethod[options.method].push({
      handler,
      params: options.routeParams,
      route: options.route,
      routeRegex: options.routeRegex,
    });
  }

  moduleWrite.push(`type RouteEntry = {
  handler: Function;
  params: string[];
  regex: string;
  route: string;
};\n`);

  moduleWrite.push(`type RoutesByMethod = {
  [httpMethod: string]: RouteEntry[];
};\n`);

  moduleWrite.push(`export const routesByMethod: RoutesByMethod = {
    ${Object.keys(routesByMethod)
      .map(
        (method) => `${method}: [
      ${routesByMethod[method]
        .map(
          (route) => `{
        handler: ${route.handler},
        params: ${JSON.stringify(route.params)},
        regex: "${route.routeRegex.source}",
        route: "${route.route}",
      }`
        )
        .join(",")}
    ],\n`
      )
      .join("")}
  };`);

  moduleWrite.save();
};

export const DynamicApiRoutesGenerator = {
  generateDynamicRoutes,
  getEndpointsRegistry,
};
