import { createQueryKey } from './createQueryKey';

export const USER_QUERY_KEYS = {
  ...createQueryKey(['user'] as const),
};
