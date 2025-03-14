import {
  keepPreviousData,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ADMIN_QUERY_KEYS } from '@/shared/api/queryKeys';
import { ById } from '@/shared/types/api';
import { adminAPI } from './api';
import { AdminCreateRequest, AdminLoginRequest, AdminResponse } from './types';

// 📌 관리자 리스트 조회
export const useGetAdminList = (options?: QueryOptions<AdminResponse[]>) => {
  return useQuery<AdminResponse[]>({
    queryKey: ADMIN_QUERY_KEYS.list,
    queryFn: () => adminAPI.getAdminList(),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 관리자 상세 조회
export const useGetAdminDetail = (
  { id }: ById,
  options?: QueryOptions<AdminResponse>,
) => {
  return useQuery<AdminResponse>({
    queryKey: [...ADMIN_QUERY_KEYS.detail, { id }],
    queryFn: () => adminAPI.getAdminDetail({ id }),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 관리자 등록
export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminCreateRequest) => adminAPI.createAdmin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.list });
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 관리자 로그인
export const useLoginAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminLoginRequest) => adminAPI.loginAdmin(payload),
    onSuccess: () => {},
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 관리자 임시 비밀번호 발급
export const useUpdateAdminPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: ById) => adminAPI.updateAdminPassword({ id }),
    onSuccess: () => {},
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 관리자 삭제
export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: ById) => adminAPI.deleteAdmin({ id }),
    onSuccess: () => {},
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};
