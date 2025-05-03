import { FirebaseConfig } from "@/lib/shared/config/Firebase.config";
import { ConfigFirebaseModel } from "@/lib/shared/models/ConfigFirebase.model";

import { Controller } from "../decorators/Controller.decorator";
import { Endpoint } from "../decorators/Endpoint.decorator";
import { UserId } from "../decorators/Args";
import { UserService } from "../services/User.service";
import { ConfigFirebaseAdminModel } from "@/lib/shared/models/ConfigFirebaseAdmin";

@Controller("/user")
export class UserController {
  @Endpoint("GET", "/me")
  static async getUser(
    @UserId() userId: string
  ): Promise<ConfigFirebaseAdminModel> {
    return UserService.getUser(userId);
  }
}
