// // This file is auto-generated. Do not edit it manually.
// // It will be overwritten on the next build.
import { ConfigController } from "@/lib/api/controllers/Chat.controller";
import { ConfigController } from "@/lib/api/controllers/Config.controller";

type RouteEntry = {
  handler: Function;
  params: string[];
  regex: string;
  route: string;
};

type RoutesByMethod = {
  [httpMethod: string]: RouteEntry[];
};

export const routesByMethod: RoutesByMethod = {
    POST: [
      {
        handler: ConfigController.createChat,
        params: [],
        regex: "^\/chat\/firebase$",
        route: "/chat/firebase",
      }
    ],
GET: [
      {
        handler: ConfigController.getFirebaseConfig,
        params: [],
        regex: "^\/config\/firebase$",
        route: "/config/firebase",
      }
    ],

  };