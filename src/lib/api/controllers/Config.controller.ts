import {FirebaseConfig} from "@/lib/shared/config/Firebase.config";
import {ConfigFirebaseModel} from "@/lib/shared/models/ConfigFirebase.model";

import {Controller} from "../decorators/Controller.decorator";
import {Endpoint} from "../decorators/Endpoint.decorator";
import {Body, Params, Query} from "../decorators/Args";
import {IdDto} from "@/lib/shared/dtos/Id.dto";

@Controller("/config")
export class ConfigController {
  @Endpoint("GET", "/firebase")
  static async getFirebaseConfig(): Promise<ConfigFirebaseModel> {
    return FirebaseConfig;
  }
}
