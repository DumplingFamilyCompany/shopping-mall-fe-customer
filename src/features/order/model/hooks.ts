import {
  keepPreviousData,
  QueryOptions,
  useQuery,
} from '@tanstack/react-query';
import { ORDER_QUERY_KEYS } from '@/shared/api/queryKeys';
import { ById } from '@/shared/types/api';
import { orderAPI } from './api';
import { OrderResponse } from './types';

// 📌 주문 리스트 조회
export const useGetOrderList = (options?: QueryOptions<OrderResponse[]>) => {
  return useQuery<OrderResponse[]>({
    queryKey: ORDER_QUERY_KEYS.list,
    queryFn: () => orderAPI.getOrderList(),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 주문 상세 조회
export const useGetOrderDetail = (
  { id }: ById,
  options?: QueryOptions<OrderResponse>,
) => {
  return useQuery<OrderResponse>({
    queryKey: ORDER_QUERY_KEYS.detail,
    queryFn: () => orderAPI.getOrderDetail({ id }),
    placeholderData: keepPreviousData,
    ...options,
  });
};
