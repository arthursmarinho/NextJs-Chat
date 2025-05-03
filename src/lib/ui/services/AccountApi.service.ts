import {GetAccountsParamsDto} from "@/lib/shared/dtos/accounts/GetAccountsParams.dto";
import {ApiResponse} from "@/lib/shared/types/Api.types";
import {ApiService} from "@/lib/ui/services/Api.service";
import {Account} from "@prisma/client";

class AccountApiService extends ApiService {
  async getAccounts(
    args?: GetAccountsParamsDto
  ): Promise<ApiResponse<Account[]>> {
    const response = await this.request<Account[], GetAccountsParamsDto>(
      `/api/accounts`,
      {
        method: "GET",
        queryParams: args,
      }
    );

    return response;
  }
}

export default new AccountApiService();
