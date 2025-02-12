import { createSearchParams } from '@/utils/createSearchParams';
import { typedFetch } from '../typedFetch';

export class AuthService {
  static repository: AuthService = new AuthService();

  static getInstance = () => {
    return this.repository;
  };

  getTestUserList = async () => {
    const response =
      await typedFetch<{ id: string; name: string }[]>('/api/users');

    return response;
  };

  getTestPhotoList = async (params: { start: number; limit: number }) => {
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
  };

  updateSingleSelectResponse = async (params: {
    data: { id: string; label: string };
  }) => {
    const response = await typedFetch<{ id: string; label: string }[]>(
      `/api/single-select`,
      'POST',
      params.data,
    );

    return response;
  };
}
