import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { authAPI } from './model';
import { Tokens } from './types';

// 📌 1. 토큰 저장
export const useSetToken = () => {
  return useMutation<[], Error, Tokens>({
    mutationFn: (tokens) => authAPI.setToken(tokens).then((res) => res),
    onSuccess: () => {
      // TODO: 토큰 저장 후 invalid 되야 할 데이터가 있는지 확인 필요
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌  2. 토큰 삭제
export const useDeleteToken = () => {
  return useMutation({
    mutationFn: authAPI.deleteToken,
    onSuccess: () => {
      // TODO: 토큰 삭제 후 invalid 되야 할 데이터가 있는지 확인 필요
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 3. 유저 목록 조회
export const useGetUsers = (
  options?: Omit<
    UseQueryOptions<{ id: string; name: string }[]>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<{ id: string; name: string }[]>({
    queryKey: ['users'],
    queryFn: authAPI.getUsers,
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 4. 유저 생성
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
