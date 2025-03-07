import { typedFetch } from '@/shared/lib/apiClient';
import { Tokens } from './types';

export const authAPI = {
  // 🍪 쿠키에 토큰 저장
  setToken: async (tokens: Tokens) => {
    return await typedFetch<[]>(`/api/auth`, 'POST', tokens);
  },

  // 🍪 쿠키에서 토큰 삭제
  deleteToken: async () => {
    return await typedFetch<[]>(`/api/auth`, 'DELETE');
  },

  // 유저 목록 가져오기
  getUsers: async () => {
    return await typedFetch<[]>('/api/protected');
  },

  // 유저 생성 (POST)
  createUser: async (userData: { name: string; email: string }) => {
    return typedFetch<[]>('/api/users', 'POST', userData);
  },
};
