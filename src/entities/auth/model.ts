import { typedFetch } from '@/shared/lib/apiClient';
import { createSearchParams } from '@/shared/lib/createSearchParams';
import { Tokens } from './types';

export const authAPI = {
  login: async (tokens: Tokens) => {
    return await typedFetch<[]>(`/api/auth`, 'POST', tokens);
  },
  logout: async () => {
    return await typedFetch<[]>(`/api/auth`, 'DELETE');
  },
  // 유저 목록 가져오기
  getAuth: async () => {
    return await typedFetch<[]>('/api/auth');
  },

  // 유저 생성 (POST)
  createUser: async (userData: { name: string; email: string }) => {
    return typedFetch<[]>('/api/users', 'POST', userData);
  },
};
