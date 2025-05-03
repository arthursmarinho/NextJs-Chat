import "reflect-metadata";
import {EndpointMetadata} from "@/lib/api/decorators/Endpoint.decorator";
import path from "path";

import {ModuleLoader} from "../helpers/ModuleLoader.helper";
import {ModuleWrite} from "../helpers/ModuleWrite.helper";
import {DynamicApiRoutesGenerator} from "./DynamicApiRoutesGenerator.utils";

const generateApiClient = async () => {
  const controllersLoader = new ModuleLoader("controller");

  await controllersLoader.loadExports();

  const controllersMap = controllersLoader.map;
  const controllers = controllersLoader.exports;
  const dtosLoader = new ModuleLoader("dto");

  await dtosLoader.loadExports();

  const dtosMap = dtosLoader.map;
  const modelsLoader = new ModuleLoader("model");

  await modelsLoader.loadExports();

  const modelsMap = modelsLoader.map;

  const registry = DynamicApiRoutesGenerator.getEndpointsRegistry(controllers);
  const targetImports = new Set<string>();

  const routesByControllerMap = new Map<
    string,
    ({endpointMethod: string} & EndpointMetadata)[]
  >();
  for (const route of registry) {
    const {controller, method, options: metadata} = route;
    const key = controller.replace("Controller", "Service");

    targetImports.add(key);
    Object.values(metadata.schemas).forEach((schema) => {
      if (schema) targetImports.add(schema.name);
    });

    if (!routesByControllerMap.has(key)) {
      routesByControllerMap.set(key, []);
    }

    const routes = routesByControllerMap.get(key)!;

    routes.push({...metadata, endpointMethod: method});
  }
  const routesByController = Object.fromEntries(
    routesByControllerMap.entries()
  );

  const moduleWrite = new ModuleWrite(
    path.resolve("src/lib/shared/constants/ApiClient.gen.ts")
  );

  moduleWrite.pushImport("@/lib/ui/services/ApiClient.helper", [
    "apiClientHelper",
    "ApiServiceInit",
  ]);
  moduleWrite.pushBlankLine();

  Array.from(controllersMap.entries()).forEach(([key, exports]) => {
    moduleWrite.pushImport(
      key,
      exports.map((exp) => exp.name).filter((name) => targetImports.has(name))
    );
  });
  moduleWrite.pushBlankLine();

  Array.from(dtosMap.entries()).forEach(([key, exports]) => {
    moduleWrite.pushImport(
      key,
      exports.map((exp) => exp.name).filter((name) => targetImports.has(name))
    );
  });
  moduleWrite.pushBlankLine();

  Array.from(modelsMap.entries()).forEach(([key, exports]) => {
    moduleWrite.pushImport(
      key,
      exports.map((exp) => exp.name).filter((name) => targetImports.has(name))
    );
  });
  moduleWrite.pushBlankLine();

  Object.entries(routesByController).forEach(([controller, routes]) => {
    moduleWrite.push(`export const ${controller} = {\n${routes
      .map((route) => {
        const hasAnySchema = Object.values(route.schemas).some(
          (schema) => schema
        );

        return `${route.endpointMethod}: (${
          hasAnySchema
            ? `args: ApiServiceInit<${
                route.schemas.body?.name || "undefined"
              }, ${route.schemas.query?.name || "undefined"}, ${
                route.schemas.params?.name || "undefined"
              }>`
            : ""
        }) => apiClientHelper<
        typeof ${controller}.${route.endpointMethod}${
          hasAnySchema
            ? `, 
        ${route.schemas.body?.name || "undefined"}, 
        ${route.schemas.query?.name || "undefined"}, 
        ${route.schemas.params?.name || "undefined"}
        `
            : ""
        }
        >(
          "/api${route.route}",
          "${route.method}",
          ${hasAnySchema ? "args" : ""}
        )`;
      })
      .join(",\n")}
    }`);
  });

  moduleWrite.push(`export const apiClient = {${Object.keys(routesByController)
    .map((controller) => `${controller}: ${controller},`)
    .join("")}
  }`);

  moduleWrite.save();
};

export const ApiClientGenerator = {
  generateApiClient,
};
