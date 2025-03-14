import { typedFetch } from '@/shared/api/apiClient';
import { ApiResponse, ById } from '@/shared/types/api';
import { EntityModelUser, UserResponse, UserSuspendRequest } from './types';

export const userAPI = {
  // 📌 내 정보 가져오기
  getMyProfile: async () => {
    return typedFetch<ApiResponse<{ user: EntityModelUser }>>(
      `/backend/api/v1/users`,
    );
  },

  // 📌 회원 리스트 조회
  getUserList: async () => {
    return typedFetch<UserResponse[]>(`/backend/api/v1/admin/users`);
  },

  // 📌 회원 상세 조회
  getUserDetail: async ({ id }: ById) => {
    return typedFetch<UserResponse>(`/backend/api/v1/admin/users/${id}`);
  },

  // 📌 회원 계정 정지
  suspendUser: async ({ id }: ById, payload: UserSuspendRequest) => {
    return typedFetch<string>(
      `/backend/api/v1/admin/users/${id}/suspend`,
      'PUT',
      payload,
    );
  },
};
