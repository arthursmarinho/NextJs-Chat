// // This file is auto-generated. Do not edit it manually.
// // It will be overwritten on the next build.
import { AuthController } from "@/lib/api/controllers/Auth.controller";
import { ChatController } from "@/lib/api/controllers/Chat.controller";
import { ConfigController } from "@/lib/api/controllers/Config.controller";
import { MessageController } from "@/lib/api/controllers/Message.controller";
import { UserController } from "@/lib/api/controllers/User.controller";

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
        handler: ChatController.createChat,
        params: [],
        regex: "^\/chat$",
        route: "/chat/",
      },{
        handler: ChatController.getChatWithUser,
        params: ["userId"],
        regex: "^\/chat\/me\/([^\/]+)$",
        route: "/chat/me/:userId",
      },{
        handler: MessageController.createMessage,
        params: [],
        regex: "^\/chat$",
        route: "/chat/",
      }
    ],
GET: [
      {
        handler: ChatController.getUserChats,
        params: [],
        regex: "^\/chat$",
        route: "/chat/",
      },{
        handler: ConfigController.getFirebaseConfig,
        params: [],
        regex: "^\/config\/firebase$",
        route: "/config/firebase",
      },{
        handler: UserController.getAllUsers,
        params: [],
        regex: "^\/users$",
        route: "/users/",
      },{
        handler: UserController.getMe,
        params: [],
        regex: "^\/users\/me$",
        route: "/users/me",
      }
    ],

  };