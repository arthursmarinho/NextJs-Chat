import {DecoratorsUtils} from "../utils/Decorators.utils";

export type ArgDecoratorName =
  | "body"
  | "cookies"
  | "pagination"
  | "params"
  | "query"
  | "req"
  | "res"
  | "userId";

export type ArgumentDecorator = ReturnType<
  typeof DecoratorsUtils.createArgumentDecorator
>;
