import "reflect-metadata";
import _ from "lodash";

import {ArgDecoratorName} from "../types/Decorator.types";
import {ValidationUtils} from "./Validation.utils";

export interface CreateArgumentDecoratorOptions {
  schema: object;
}

export type PropertyKey = string | symbol;

type CreateMethodDecoratorFn<TNextReturn> = (
  target: object,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
  next: (args?: []) => Promise<TNextReturn>
) => PropertyDescriptor;

const applyArgumentDecorator = async <TValue extends object>(
  args: Array<TValue>,
  target: object,
  propertyKey: PropertyKey,
  argumentName: ArgDecoratorName,
  getter: () => TValue
): Promise<[TValue, number] | null> => {
  const resolvedArgument = await DecoratorsUtils.resolveArgumentDecorator(
    argumentName,
    target,
    propertyKey,
    getter
  );

  if (!resolvedArgument) return null;

  const [value, index] = resolvedArgument;

  args[index] = value;

  return resolvedArgument;
};

const createArgumentDecorator = (
  argumentName: ArgDecoratorName,
  options?: CreateArgumentDecoratorOptions
): ParameterDecorator => {
  return (
    target: object,
    propertyKey: PropertyKey | undefined,
    propertyIndex: number
  ): void => {
    defineMetadata(
      createArgumentMetadataKey(argumentName),
      propertyIndex,
      target,
      propertyKey || ""
    );

    if (options?.schema)
      defineMetadata(
        createArgumentSchemaMetadataKey(argumentName),
        options.schema,
        target,
        propertyKey || ""
      );
  };
};

const createArgumentMetadataKey = (argumentName: string): string =>
  `arg_${argumentName}`;

const createArgumentSchemaMetadataKey = (argumentName: string): string =>
  `arg_${argumentName}_schema`;

const createClassDecorator =
  (fn: ClassDecorator): ReturnType<ClassDecorator> =>
  (...args: Parameters<ClassDecorator>) => {
    return fn(...args);
  };

const createMethodDecorator =
  <TNextReturn>(fn: CreateMethodDecoratorFn<TNextReturn>) =>
  (
    target: object,
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const originalMethod = descriptor.value;

    return fn(
      target,
      propertyKey,
      descriptor,
      (args?: []): Promise<TNextReturn> =>
        originalMethod.apply(this, args || args)
    );

    // descriptor.value = (
    //   ...originalArgs: [NextRequest, {params: Promise<Record<string, string>>}]
    // ): void =>

    // return descriptor;
  };

const defineMetadata = <TValue>(
  key: string,
  value: TValue,
  target: object,
  propertyKey: PropertyKey
): void => {
  Reflect.defineMetadata(key, value, target, propertyKey);
};

const getMetadata = <TData>(
  key: string,
  target: object,
  propertyKey: PropertyKey
): TData => Reflect.getMetadata(key, target, propertyKey);

const getMetadataKeys = (target: object, propertyKey: PropertyKey): string[] =>
  Reflect.getMetadataKeys(target, propertyKey);

const registerMetadataKey = (
  key: string,
  target: object,
  propertyKey: PropertyKey
): void => Reflect.defineMetadata(key, "", target, propertyKey);

const resolveArgumentDecorator = async <TValue extends object>(
  argumentName: ArgDecoratorName,
  target: object,
  propertyKey: PropertyKey,
  getter: () => TValue,
  skipValidation = false
): Promise<[TValue, number] | null> => {
  const metadataValue = Reflect.getMetadata(
    createArgumentMetadataKey(argumentName),
    target,
    propertyKey
  );

  if (_.isNil(metadataValue)) return null;

  let value: TValue;
  try {
    value = await getter();
  } catch (error) {
    throw new Error(`Error when resolving ${argumentName}`);
  }

  const returnPair = [value, metadataValue] as [TValue, number];
  if (skipValidation) return returnPair;

  const schema = Reflect.getMetadata(
    createArgumentSchemaMetadataKey(argumentName),
    target,
    propertyKey
  );

  if (schema) {
    try {
      returnPair[0] = await ValidationUtils.parsePayload(value, schema);
    } catch (error) {
      throw new Error(`Invalid payload for argument ${argumentName}. ${error}`);
    }
  }

  return returnPair;
};

const getArgumentSchema = (
  argumentName: ArgDecoratorName,
  target: object,
  propertyKey: PropertyKey
): Function | undefined => {
  const schema = Reflect.getMetadata(
    createArgumentSchemaMetadataKey(argumentName),
    target,
    propertyKey
  );

  return schema || undefined;
};

export const DecoratorsUtils = {
  applyArgumentDecorator,
  createArgumentDecorator,
  createClassDecorator,
  createMethodDecorator,
  defineMetadata,
  getMetadata,
  getMetadataKeys,
  registerMetadataKey,
  resolveArgumentDecorator,
  getArgumentSchema,
};
