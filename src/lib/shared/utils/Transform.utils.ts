const toDate = <T extends string = string>({
  value,
}: {
  value?: T;
}): Date | undefined => {
  return value ? new Date(value) : undefined;
};

export {toDate};
