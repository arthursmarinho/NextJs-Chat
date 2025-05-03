import { UserModel } from "@/lib/shared/models/User.model";

import { UserId } from "../decorators/Args";
import { Controller } from "../decorators/Controller.decorator";
import { Endpoint } from "../decorators/Endpoint.decorator";
import { UserService } from "../services/User.service";

@Controller("/users")
export class UserController {
  @Endpoint("GET", "/")
  static async getAllUsers(): Promise<UserModel[]> {
    return UserService.getAllUsers();
  }

  @Endpoint("GET", "/me")
  static async getMe(@UserId() userId: string): Promise<UserModel> {
    return UserService.getMe(userId);
  }
}
