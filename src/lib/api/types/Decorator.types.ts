import {DecoratorsUtils} from "../utils/Decorators.utils";

export type ArgDecoratorName =
  | "body"
  | "cookies"
  | "pagination"
  | "params"
  | "query"
  | "req"
  | "userId";

export type ArgumentDecorator = ReturnType<
  typeof DecoratorsUtils.createArgumentDecorator
>;
