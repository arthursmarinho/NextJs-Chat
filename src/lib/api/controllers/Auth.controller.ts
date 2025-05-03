import {AuthSignInSsoBodyDto} from "@/lib/shared/dtos/auth/AuthSignInSsoBody.dto";
import {NextResponse} from "next/server";

import {Body, Res} from "../decorators/Args";
import {Controller} from "../decorators/Controller.decorator";
import {Endpoint} from "../decorators/Endpoint.decorator";
import {AuthService} from "../services/Auth.service";

@Controller("/auth")
export class AuthController {
  @Endpoint("POST", "/signin/sso", {
    private: false,
  })
  signInWithSso(
    @Res() res: NextResponse,
    @Body({schema: AuthSignInSsoBodyDto}) body: AuthSignInSsoBodyDto
  ): undefined {
    return AuthService.signInWithSso(body.token);
  }
}
