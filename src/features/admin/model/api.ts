import { typedFetch } from '@/shared/api/apiClient';
import { ById, CommonResult } from '@/shared/types/api';
import { AdminCreateRequest, AdminLoginRequest, AdminResponse } from './types';

export const adminAPI = {
  // 📌 관리자 리스트 조회
  getAdminList: async () => {
    return typedFetch<AdminResponse[]>(`/backend/api/v1/admin/list`);
  },

  // 📌 관리자 상세 조회
  getAdminDetail: async ({ id }: ById) => {
    return typedFetch<AdminResponse>(`/backend/api/v1/admin/${id}`);
  },

  // 📌 관리자 등록
  createAdmin: async (payload: AdminCreateRequest) => {
    return typedFetch<AdminResponse>(`/backend/api/v1/admin`, 'POST', payload);
  },

  // 📌 관리자 로그인
  loginAdmin: async (payload: AdminLoginRequest) => {
    return typedFetch<string>(`/backend/api/v1/admin/login`, 'POST', payload);
  },

  // 📌 관리자 임시 비밀번호 발급
  updateAdminPassword: async ({ id }: ById) => {
    return typedFetch<string>(
      `/backend/api/v1/admin/${id}/reset-password`,
      'PUT',
    );
  },

  // 📌 관리자 삭제
  deleteAdmin: async ({ id }: ById) => {
    return typedFetch<CommonResult>(`/backend/api/v1/admin/${id}`, 'DELETE');
  },
};
