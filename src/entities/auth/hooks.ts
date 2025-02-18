import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { authAPI } from './model';
import { Tokens } from './types';

// 1. 로그인
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<[], Error, Tokens>({
    mutationFn: (tokens) => authAPI.login(tokens).then((res) => res),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // 유저 목록 다시 불러오기
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // 유저 목록 다시 불러오기
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 1. 유저 목록 조회 훅
export const useGetUsers = (
  options?: Omit<UseQueryOptions<[]>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<[]>({
    queryKey: ['users'],
    queryFn: authAPI.getAuth,
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 2. 유저 생성 훅
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // 유저 목록 다시 불러오기
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};
