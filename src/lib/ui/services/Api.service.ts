import {ApiEndpointDataType, ApiResponse} from "@/lib/shared/types/Api.types";

interface ApiServiceInit<TBody extends ApiEndpointDataType = never>
  extends Omit<RequestInit, "body"> {
  body?: TBody;
  queryParams?: TBody;
}

export class ApiService {
  static async request<
    TResponse extends ApiResponse,
    TBody extends ApiResponse = never
  >(url: string, init: ApiServiceInit<TBody>): Promise<ApiResponse<TResponse>> {
    if (init.queryParams) {
      const searchParams = new URLSearchParams(
        Object.entries(init.queryParams)
      );

      url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {
      ...init,
      body: init.body ? JSON.stringify(init.body) : undefined,
    });

    return (await response.json()) as ApiResponse<TResponse>;
  }
}
