import { typedFetch } from '@/shared/lib/apiClient';
import { createSearchParams } from '@/shared/lib/createSearchParams';
import { ApiResponse, PaginationParams } from '@/shared/types/api';
import { EntityModelUser, PagedModelEntityModelUser, User } from './types';

export const userAPI = {
  // 내 정보 가져오기
  getMyProfile: async () => {
    return typedFetch<ApiResponse<{ user: EntityModelUser }>>(
      `/backend/api/v1/users`,
    );
  },
  // 유저 목록 가져오기
  getUsers: async (params: PaginationParams) => {
    return typedFetch<PagedModelEntityModelUser>(
      `/backend/users?${createSearchParams(params)}`,
    );
  },

  // 특정 유저 정보 가져오기
  getUserById: async (id: string): Promise<User> => {
    return typedFetch<User>(`/api/users??${createSearchParams({ id })}`);
  },

  // 유저 생성 (POST)
  createUser: async (userData: { name: string; email: string }) => {
    return typedFetch<User>('/api/users', 'POST', userData);
  },

  // 유저 삭제 (DELETE)
  deleteUser: async (id: string) => {
    return typedFetch<void>(`/api/users/${id}`, 'DELETE');
  },
};
