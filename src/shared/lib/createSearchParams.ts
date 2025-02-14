export const createSearchParams = <T extends Record<string, unknown>>(
  paramsObject: T,
) => {
  const stringObject = Object.entries(paramsObject).reduce(
    (acc, [key, value]) => {
      return !!value ? { ...acc, [key]: String(value) } : acc;
    },
    {},
  );
  return new URLSearchParams(stringObject).toString();
};
