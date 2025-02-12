import { createQueryKey } from '@/utils/createQueryKey';

export const TEST_QUERY_KEYS = {
  ...createQueryKey(['test'] as const),
};
