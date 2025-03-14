import { typedFetch } from '@/shared/lib/apiClient';
import { ById } from '@/shared/types/api';
import { OrderResponse } from './types';

export const orderAPI = {
  // 📌 주문 리스트 조회
  getOrderList: async () => {
    return typedFetch<OrderResponse[]>(`/backend/api/v1/admin/orders`);
  },

  // 📌 주문 상세 조회
  getOrderDetail: async ({ id }: ById) => {
    return typedFetch<OrderResponse>(`/backend/api/v1/admin/orders/${id}`);
  },
};
