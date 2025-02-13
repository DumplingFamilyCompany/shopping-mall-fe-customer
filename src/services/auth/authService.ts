import { createSearchParams } from '@/utils/createSearchParams';
import { typedFetch } from '../apiClient';

export const authService = {
  getTestUserList: async () => {
    const response =
      await typedFetch<{ id: string; name: string }[]>('/api/users');

    return response;
  },

  getTestPhotoList: async (params: { start: number; limit: number }) => {
    const response = await typedFetch<
      {
        albumId: number;
        id: number;
        title: string;
        url: string;
        thumbnailUrl: string;
      }[]
    >(`/api/photos?${createSearchParams(params)}`);

    return response;
  },

  updateSingleSelectResponse: async (params: {
    data: { id: string; label: string };
  }) => {
    const response = await typedFetch<{ id: string; label: string }[]>(
      `/api/single-select`,
      'POST',
      params.data,
    );

    return response;
  },
};
