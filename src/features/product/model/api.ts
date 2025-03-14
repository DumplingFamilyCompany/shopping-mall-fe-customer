import { typedFetch } from '@/shared/api/apiClient';
import { ById, CommonResult } from '@/shared/types/api';
import {
  ProductCreateRequest,
  ProductRankRequest,
  ProductResponse,
  ProductUpdateRequest,
  ProductVisibilityRequest,
} from './types';

export const productAPI = {
  // 📌 상품 리스트 조회
  getProductList: async () => {
    return typedFetch<ProductResponse[]>(`/backend/api/v1/admin/products`);
  },

  // 📌 상품 상세 조회
  getProductDetail: async ({ id }: ById) => {
    return typedFetch<ProductResponse>(`/backend/api/v1/admin/products/${id}`);
  },

  // 📌 상품 등록
  createProduct: async (payload: ProductCreateRequest) => {
    return typedFetch<ProductResponse>(
      `/backend/api/v1/admin/products`,
      'POST',
    );
  },

  // 📌 상품 수정
  updateProduct: async ({ id }: ById, payload: ProductUpdateRequest) => {
    return typedFetch<ProductResponse>(
      `/backend/api/v1/admin/products/${id}`,
      'PUT',
      payload,
    );
  },

  // 📌 상품 순위 수정
  updateProductRank: async ({ id }: ById, payload: ProductRankRequest) => {
    return typedFetch<ProductResponse>(
      `/backend/api/v1/admin/products/${id}/rank`,
      'PUT',
      payload,
    );
  },

  // 📌 상품 노출 여부 수정
  updateProductVisibility: async (
    { id }: ById,
    payload: ProductVisibilityRequest,
  ) => {
    return typedFetch<ProductResponse>(
      `/backend/api/v1/admin/products/${id}/visibility`,
      'PUT',
      payload,
    );
  },

  // // 📌 상품 옵션 관리
  // editProductOption: async ({ id }: ById) => {
  //   return typedFetch<ProductResponse>(`/backend/api/v1/admin/products`, 'PUT');
  // },

  // 📌 상품 삭제
  deleteProduct: async ({ id }: ById) => {
    return typedFetch<CommonResult>(
      `/backend/api/v1/admin/products/${id}`,
      'DELETE',
    );
  },
};
