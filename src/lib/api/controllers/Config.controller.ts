import {FirebaseConfig} from "@/lib/shared/config/Firebase.config";
import {IdDto} from "@/lib/shared/dtos/Id.dto";
import {ConfigFirebaseModel} from "@/lib/shared/models/ConfigFirebase.model";

import {Body, Params, Query} from "../decorators/Args";
import {Controller} from "../decorators/Controller.decorator";
import {Endpoint} from "../decorators/Endpoint.decorator";

@Controller("/config")
export class ConfigController {
  @Endpoint("GET", "/firebase", {
    private: false,
  })
  static async getFirebaseConfig(): Promise<ConfigFirebaseModel> {
    return FirebaseConfig;
  }
}
