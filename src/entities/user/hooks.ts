import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { USER_QUERY_KEYS } from '@/shared/lib/queryKeys';
import {
  ApiResponse,
  PaginationParams,
  QueryOptions,
} from '@/shared/types/api';
import { userAPI } from './model';
import { EntityModelUser, PagedModelEntityModelUser } from './types';

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

// 📌 유저 목록 조회
export const useGetUsers = (
  params: PaginationParams,
  options?: QueryOptions<PagedModelEntityModelUser>,
) => {
  return useQuery<PagedModelEntityModelUser>({
    queryKey: USER_QUERY_KEYS.list,
    queryFn: () => userAPI.getUsers(params),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 유저 상세 조회
export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: [...USER_QUERY_KEYS.detail, id],
    queryFn: () => userAPI.getUserById(id),
    enabled: !!id, // id가 존재할 때만 실행
  });
};

// 📌 유저 계정 정지
export const useSuspendUserById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.suspendUserById,
    onSuccess: (_, variables) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.list }),
        queryClient.invalidateQueries({
          queryKey: [...USER_QUERY_KEYS.detail, variables],
        }),
      ]);
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 유저 생성 훅
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // 유저 목록 다시 불러오기
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 유저 삭제 훅
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // 유저 목록 다시 불러오기
    },
  });
};
