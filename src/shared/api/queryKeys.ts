import { createQueryKey } from './createQueryKey';

export const ADMIN_QUERY_KEYS = {
  ...createQueryKey(['admin'] as const),
};

export const USER_QUERY_KEYS = {
  ...createQueryKey(['user'] as const),
};

export const REVIEW_QUERY_KEYS = {
  ...createQueryKey(['review'] as const),
};

export const PRODUCT_QUERY_KEYS = {
  ...createQueryKey(['product'] as const),
};

export const INQUIRY_QUERY_KEYS = {
  ...createQueryKey(['inquiry'] as const),
};

export const CATEGORY_QUERY_KEYS = {
  ...createQueryKey(['category'] as const),
};

export const ORDER_QUERY_KEYS = {
  ...createQueryKey(['order'] as const),
};
