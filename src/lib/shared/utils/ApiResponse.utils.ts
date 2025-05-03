import {ClassConstructor, plainToInstance} from "class-transformer";

import {
  ApiEndpointDataType,
  ApiPaginatedData,
  ApiResponse,
} from "../types/Api.types";

const paginatedResponseToInstance = <
  TData extends ApiEndpointDataType,
  TCls extends ApiEndpointDataType
>(
  response: ApiResponse<ApiPaginatedData<TData>>,
  cls: ClassConstructor<TCls>
): ApiResponse<ApiPaginatedData<TCls>> => {
  return {
    ...response,
    data: plainToInstance(cls, response?.data) as unknown as TCls[],
  };
};

const createPaginatedData = <TData extends ApiEndpointDataType>(
  data: TData[],
  total: number,
  cursor: number,
  take: number
): ApiPaginatedData<TData> => {
  return {
    cursor,
    data,
    nextCursor: cursor + take < total ? cursor + take : undefined,
    take,
    total,
  };
};

const resolveData = <TData extends ApiEndpointDataType>(
  response: ApiResponse
): TData => {
  const result = response;

  if (!result) return result as TData;

  const resultKeys = Object.keys(result);
  const paginableKeys = ["data", "hasNext", "skip", "take", "total"];
  if (resultKeys.every((key) => paginableKeys.includes(key))) {
    return (result as ApiPaginatedData).data as TData;
  }

  return result as TData;
};

export const ApiResponseUtils = {
  createPaginatedData,
  paginatedResponseToInstance,
  resolveData,
};
