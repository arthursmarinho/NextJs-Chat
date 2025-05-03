import {AuthSignInBodyDto} from "@/lib/shared/dtos/auth/AuthSignInBody.dto";
import {ApiResponse} from "@/lib/shared/types/Api.types";
import {TokenPayload} from "@/lib/shared/types/Auth.types";
import {ApiService} from "@/lib/ui/services/Api.service";

export class AuthApiService extends ApiService {
  async login(args: AuthSignInBodyDto): Promise<ApiResponse<TokenPayload>> {
    const response = await this.request<TokenPayload, AuthSignInBodyDto>(
      `/api/auth/login`,
      {
        body: args,
        method: "POST",
      }
    );

    return response;
  }
}

export default new AuthApiService();
