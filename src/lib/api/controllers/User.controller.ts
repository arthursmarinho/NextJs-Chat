import {UserModel} from "@/lib/shared/models/User.model";

import {UserId} from "../decorators/Args";
import {Controller} from "../decorators/Controller.decorator";
import {Endpoint} from "../decorators/Endpoint.decorator";
import {UserService} from "../services/User.service";

@Controller("/user")
export class UserController {
  @Endpoint("GET", "/me")
  static async getUser(@UserId() userId: string): Promise<UserModel> {
    return UserService.getUser(userId);
  }
}
