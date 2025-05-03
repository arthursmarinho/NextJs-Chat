import {
  DashboardAccountsBalanceDto,
  DashboardGetAccountsBalanceQueryParamsDto,
} from "@/lib/shared/dtos/dashboard/DashboardGetAccountsBalance.dto";
import {
  DashboardBalanceOverviewDto,
  DashboardGetBalanceOverviewQueryParamsDto,
} from "@/lib/shared/dtos/dashboard/DashboardGetBalanceOverview.dto";
import {
  DashboardCreditCarsBillDto,
  DashboardGetCreditCarsBillQueryParamsDto,
} from "@/lib/shared/dtos/dashboard/DashboardGetCreditCardsBill.dto";
import {ApiResponse} from "@/lib/shared/types/Api.types";
import {ApiService} from "@/lib/ui/services/Api.service";

class DashboardApiService extends ApiService {
  async getAccountsBalance(
    args: DashboardGetAccountsBalanceQueryParamsDto
  ): Promise<ApiResponse<DashboardAccountsBalanceDto>> {
    return await this.request<
      DashboardAccountsBalanceDto,
      DashboardGetAccountsBalanceQueryParamsDto
    >(`/api/dashboard/accounts/balance`, {
      method: "GET",
      queryParams: args,
    });
  }

  async getBalanceOverview(
    args: DashboardGetBalanceOverviewQueryParamsDto
  ): Promise<ApiResponse<DashboardBalanceOverviewDto>> {
    return await this.request<
      DashboardBalanceOverviewDto,
      DashboardGetBalanceOverviewQueryParamsDto
    >(`/api/dashboard/balance/overview`, {
      method: "GET",
      queryParams: args,
    });
  }

  async getCreditCardsBill(
    args: DashboardGetCreditCarsBillQueryParamsDto
  ): Promise<ApiResponse<DashboardCreditCarsBillDto>> {
    return await this.request<
      DashboardCreditCarsBillDto,
      DashboardGetCreditCarsBillQueryParamsDto
    >(`/api/dashboard/credit-cards/bills`, {
      method: "GET",
      queryParams: args,
    });
  }
}

export default new DashboardApiService();
