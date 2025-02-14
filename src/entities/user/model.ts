import { typedFetch } from '@/shared/lib/apiClient';
import { createSearchParams } from '@/shared/lib/createSearchParams';
import { User } from './types';

export const userAPI = {
  // 유저 목록 가져오기
  getUsers: async () => {
    return typedFetch<User[]>('/api/users');
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
