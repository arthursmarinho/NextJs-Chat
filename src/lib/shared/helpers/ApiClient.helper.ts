import {
  ApiEndpointDataType,
  ApiResponse,
  HttpMethod,
} from "@/lib/shared/types/Api.types";

export interface ApiServiceInit<
  TBody extends object | undefined = undefined,
  TQueryParams extends object | undefined = undefined,
  TParams extends object | undefined = undefined
> extends Omit<RequestInit, "body" | "method"> {
  body?: TBody;
  params?: TParams;
  queryParams?: TQueryParams;
}

export const apiClientHelper = async <
  TResponse extends ApiResponse,
  TBody extends object | undefined = undefined,
  TQueryParams extends object | undefined = undefined,
  TParams extends object | undefined = undefined
>(
  url: string,
  method: HttpMethod,
  init?: ApiServiceInit<TBody, TQueryParams, TParams>
): Promise<ApiResponse<TResponse>> => {
  if (init?.params) {
    url = url.replace(/:([a-zA-Z0-9_]+)/g, (_, key: keyof TParams) => {
      if (key in init.params!) {
        return encodeURIComponent(init.params![key] as string);
      }

      throw new Error(`Missing value for URL parameter: ${key as string}`);
    });
  }

  if (init?.queryParams) {
    const searchParams = new URLSearchParams(Object.entries(init.queryParams));

    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    ...init,
    body: init?.body ? JSON.stringify(init?.body) : undefined,
    method,
  });

  return (await response.json()) as ApiResponse<TResponse>;
};
