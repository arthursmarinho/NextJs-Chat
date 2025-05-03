import {ApiPaginationParamsDto} from "@/lib/shared/dtos/api/ApiPaginationParams.dto";
import {IdQueryDto} from "@/lib/shared/dtos/Id.dto";
import {
  GetTransactionsParamsDto,
  TransactionsFilters,
} from "@/lib/shared/dtos/transactions/GetTransactionsParams.dto";
import {ApiResponse} from "@/lib/shared/types/Api.types";
import {ApiService} from "@/lib/ui/services/Api.service";
import {Prisma, Transaction} from "@prisma/client";

class TransactionApiService extends ApiService {
  async getTransactionById(
    args: IdQueryDto
  ): Promise<ApiResponse<Transaction>> {
    return this.request<Transaction>(`/api/transactions/${args.id}`, {
      method: "GET",
    });
  }

  async getTransactions(
    args: GetTransactionsParamsDto
  ): Promise<ApiResponse<Transaction[]>> {
    const response = await this.request<
      Transaction[],
      GetTransactionsParamsDto
    >(`/api/transactions`, {
      method: "GET",
      queryParams: {
        ...args,
        filters: JSON.stringify(args?.filters) as TransactionsFilters,
        pagination: JSON.stringify(
          args?.pagination
        ) as unknown as ApiPaginationParamsDto<
          keyof Prisma.TransactionOrderByWithRelationInput
        >,
      },
    });

    return response;
  }
}

export default new TransactionApiService();
