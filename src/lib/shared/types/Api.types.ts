import {IncomingMessage} from "http";
import {NextApiRequest} from "next";
import {HTTP_METHOD} from "next/dist/server/web/http";

import {Plain} from "./Instance.types";

export type ApiEndpointDataType = boolean | null | number | object | string;

export interface ApiPaginatedData<
  TData extends ApiEndpointDataType = ApiEndpointDataType
> {
  cursor: number;
  data: TData[];
  nextCursor?: number;
  take: number;
  total: number;
}

export type ApiResponse<
  TResponse extends
    | ApiEndpointDataType
    | ApiPaginatedData
    | ApiResponseError[]
    | null = ApiEndpointDataType
> = Plain<TResponse>;

export interface ApiResponseError {
  cause?: string;
  details: {
    req: {
      body: null | ReadableStream<Uint8Array>;
      context: unknown;
      headers: Headers;
      method: IncomingMessage["method"];
      query: NextApiRequest["query"];
      url: IncomingMessage["url"];
    };
  };
  message: string;
  name: string;
  timestamp: number;
}

export type HttpMethod = HTTP_METHOD;

type RouteEntry = {
  handler: Function;
  params: string[];
  regex: RegExp;
};

export type RoutesByMethod = {
  [httpMethod: string]: RouteEntry[];
};
