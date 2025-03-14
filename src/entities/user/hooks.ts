import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { USER_QUERY_KEYS } from '@/shared/api/queryKeys';
import { ApiResponse, ById, QueryOptions } from '@/shared/types/api';
import { userAPI } from './model';
import { EntityModelUser, UserResponse, UserSuspendRequest } from './types';

// 📌 내 정보 조회
export const useGetMyProfile = (
  options?: QueryOptions<ApiResponse<{ user: EntityModelUser }>>,
) => {
  return useQuery<ApiResponse<{ user: EntityModelUser }>>({
    queryKey: [...USER_QUERY_KEYS.detail, 'my'],
    queryFn: () => userAPI.getMyProfile(),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 회원 리스트 조회
export const useGetUserList = (options?: QueryOptions<UserResponse[]>) => {
  return useQuery<UserResponse[]>({
    queryKey: USER_QUERY_KEYS.list,
    queryFn: () => userAPI.getUserList(),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 회원 상세 조회
export const useGetUserDetail = ({ id }: ById) => {
  return useQuery({
    queryKey: [...USER_QUERY_KEYS.detail, id],
    queryFn: () => userAPI.getUserDetail({ id }),
    enabled: !!id, // id가 존재할 때만 실행
  });
};

// 📌 회원 계정 정지
export const useSuspendUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: ById & { payload: UserSuspendRequest }) =>
      userAPI.suspendUser({ id }, payload),
    onSuccess: (_, variables) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.list }),
        queryClient.invalidateQueries({
          queryKey: [...USER_QUERY_KEYS.detail, variables.id],
        }),
      ]);
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};
