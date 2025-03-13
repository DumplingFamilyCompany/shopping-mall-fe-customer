import { typedFetch } from '@/shared/lib/apiClient';
import { createSearchParams } from '@/shared/lib/createSearchParams';
import { ApiResponse, PaginationParams } from '@/shared/types/api';
import {
  EntityModelUser,
  PagedModelEntityModelUser,
  User,
  UserResponse,
  UserSuspendRequest,
} from './types';

export const userAPI = {
  // 📌 내 정보 가져오기
  getMyProfile: async () => {
    return typedFetch<ApiResponse<{ user: EntityModelUser }>>(
      `/backend/api/v1/users`,
    );
  },

  // 📌 유저 목록 가져오기
  getUsers: async (params: PaginationParams) => {
    return typedFetch<PagedModelEntityModelUser>(
      `/backend/users?${createSearchParams(params)}`,
    );
  },

  // 📌 유저 상세 조회
  getUserById: async (id: number) => {
    return typedFetch<UserResponse>(`/backend/api/v1/admin/users/${id}`);
  },

  // 유저 계정 정지
  suspendUserById: async (id: number) => {
    return typedFetch<UserSuspendRequest>(
      `/backend/api/v1/admin/users/${id}/suspend`,
      'PUT',
    );
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
