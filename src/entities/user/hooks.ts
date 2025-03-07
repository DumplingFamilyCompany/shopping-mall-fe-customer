import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { USER_QUERY_KEYS } from '@/shared/lib/queryKeys';
import { PaginationParams, QueryOptions } from '@/shared/types/query';
import { userAPI } from './model';
import { PagedModelEntityModelUser } from './types';

// 📌 1. 유저 목록 조회 훅
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

// 📌 2. 특정 유저 조회 훅
export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userAPI.getUserById(id),
    enabled: !!id, // id가 존재할 때만 실행
  });
};

// 📌 3. 유저 생성 훅
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

// 📌 4. 유저 삭제 훅
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // 유저 목록 다시 불러오기
    },
  });
};
