export type Plain<T> = {
  [K in keyof T]: T[K] extends object ? Plain<T[K]> : T[K];
};
