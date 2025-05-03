import {routesByMethod} from "@/lib/shared/constants/ApiRoutes.gen";
import {NextRequest, NextResponse} from "next/server";

import {ApiUtils} from "./Api.utils";

const handleDynamicRoute = async (
  req: NextRequest,
  context: {params: {catchAll: string[]}}
): Promise<NextResponse> => {
  const params = await context.params;
  const routePath = `/${params.catchAll.join("/")}`;
  const method = req.method.toUpperCase();
  const routes = routesByMethod[method];

  if (!routes) {
    return NextResponse.json({error: "Method not supported"}, {status: 405});
  }

  for (const route of routes) {
    const regex = new RegExp(route.regex);
    const match = routePath.match(regex);

    if (match) {
      const paramValues = match.slice(1);
      const params: Record<string, string> = {};

      route.params.forEach((param: string, i: number) => {
        params[param] = paramValues[i];
      });

      return await ApiUtils.handleMethod(route.handler)(req, {params});
    }
  }

  return NextResponse.json({error: "Route not found"}, {status: 404});
};

export const DynamicApiUtils = {
  handleDynamicRoute,
};
