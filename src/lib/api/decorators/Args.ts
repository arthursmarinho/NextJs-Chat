import { ApiPaginationParamsDto } from "@/lib/shared/dtos/api/ApiPaginationParams.dto";

import {
  CreateArgumentDecoratorOptions,
  DecoratorsUtils,
} from "../utils/Decorators.utils";

export const Req = (options?: never): ParameterDecorator =>
  DecoratorsUtils.createArgumentDecorator("req", options);

export const Res = (options?: never): ParameterDecorator =>
  DecoratorsUtils.createArgumentDecorator("res", options);

export const Body = (
  options?: CreateArgumentDecoratorOptions
): ParameterDecorator =>
  DecoratorsUtils.createArgumentDecorator("body", options);

export const Query = (
  options?: CreateArgumentDecoratorOptions
): ParameterDecorator =>
  DecoratorsUtils.createArgumentDecorator("query", options);

export const Params = (
  options?: CreateArgumentDecoratorOptions
): ParameterDecorator =>
  DecoratorsUtils.createArgumentDecorator("params", options);

export const UserId = (options?: never): ParameterDecorator =>
  DecoratorsUtils.createArgumentDecorator("userId", options);

export const Pagination = (): ParameterDecorator =>
  DecoratorsUtils.createArgumentDecorator("pagination", {
    schema: ApiPaginationParamsDto,
  });

export const Cookies = (options?: never): ParameterDecorator =>
  DecoratorsUtils.createArgumentDecorator("cookies", options);
