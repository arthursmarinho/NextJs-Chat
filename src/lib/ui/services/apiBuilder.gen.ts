// AUTO-GENERATED FILE - DO NOT EDIT
import { ConfigController } from "@/lib/api/controllers/Config.controller";
import { ConfigFirebaseModel } from "@/lib/shared/models/ConfigFirebase.model";

export const configcontroller = {
  getFirebaseConfig: {
    method: ConfigController.getFirebaseConfig,
    options: {
      method: "GET",
      responseCode: 200,
      responseType: ConfigFirebaseModel,
      route: "/config/",
    },
  },
  getFoo: {
    method: ConfigController.getFoo,
    options: {
      method: "GET",
      responseCode: 200,
      responseType: ConfigFirebaseModel,
      route: "/config/foo",
    },
  },
};