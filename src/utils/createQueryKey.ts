export const createQueryKey = <T extends readonly string[]>(domain: T) => {
  return {
    all: domain,
    list: [...domain, 'list'] as const,
    detail: [...domain, 'detail'] as const,
  };
};
