import { createQueryKey } from './createQueryKey';

export const TEST_QUERY_KEYS = {
  ...createQueryKey(['test'] as const),
};
