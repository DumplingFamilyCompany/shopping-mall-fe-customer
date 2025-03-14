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

// 📌 회원 리스트 조회
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

// 📌 회원 상세 조회
export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: [...USER_QUERY_KEYS.detail, id],
    queryFn: () => userAPI.getUserById(id),
    enabled: !!id, // id가 존재할 때만 실행
  });
};

// 📌 회원 계정 정지
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
