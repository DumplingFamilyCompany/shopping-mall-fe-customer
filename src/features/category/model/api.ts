import { typedFetch } from '@/shared/api/apiClient';
import { ById, CommonResult } from '@/shared/types/api';
import {
  CategoryCreateRequest,
  CategoryResponse,
  CategoryUpdateRequest,
} from './types';

export const categoryAPI = {
  // 📌 카테고리 리스트 조회
  getCategoryList: async () => {
    return typedFetch<CategoryResponse[]>(`/backend/api/v1/admin/categories`);
  },

  // 📌 카테고리 등록
  createCategory: async (payload: CategoryCreateRequest) => {
    return typedFetch<CategoryResponse>(
      `/backend/api/v1/admin/categories`,
      'POST',
      payload,
    );
  },

  // 📌 카테고리 수정
  updateCategory: async ({ id }: ById, payload: CategoryUpdateRequest) => {
    return typedFetch<CategoryResponse>(
      `/backend/api/v1/admin/categories/${id}`,
      'PUT',
      payload,
    );
  },

  // 📌 카테고리 삭제
  deleteCategory: async ({ id }: ById) => {
    return typedFetch<CommonResult>(
      `/backend/api/v1/admin/categories/${id}`,
      'DELETE',
    );
  },
};
