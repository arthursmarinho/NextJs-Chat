import {AsyncLocalStorage} from "node:async_hooks";

interface RequestContext {
  userId: null | number;
}

const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

export const RequestContextManager = {
  get(): RequestContext | undefined {
    return asyncLocalStorage.getStore();
  },
  run<T>(context: RequestContext, callback: () => T): T {
    return asyncLocalStorage.run(context, callback);
  },
};
