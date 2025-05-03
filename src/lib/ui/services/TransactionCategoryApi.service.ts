import {GetTransactionCategoriesParamsDto} from "@/lib/shared/dtos/transaction-categories/GetTransactionCategories.dto";
import {ApiResponse} from "@/lib/shared/types/Api.types";
import {ApiService} from "@/lib/ui/services/Api.service";
import {TransactionCategory} from "@prisma/client";

class TransactionCategoryApiService extends ApiService {
  async getTransactionCategories(
    args?: GetTransactionCategoriesParamsDto
  ): Promise<ApiResponse<TransactionCategory[]>> {
    const response = await this.request<
      TransactionCategory[],
      GetTransactionCategoriesParamsDto
    >(`/api/transaction-categories`, {
      method: "GET",
      queryParams: args,
    });

    return response;
  }
}

export default new TransactionCategoryApiService();
