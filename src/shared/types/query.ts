import { UseQueryOptions } from '@tanstack/react-query';

export type QueryOptions<T> = Partial<UseQueryOptions<T>>;

export type PaginationParams = {
  page: number;
  size: number;
  sort?: ['asc' | 'desc'];
};

export type ApiResponse<T> = {
  header: ApiResponseHeader;
  body: T;
};

export type ApiResponseHeader = {
  code: number;
  message: string;
};
