import {
  keepPreviousData,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { CATEGORY_QUERY_KEYS } from '@/shared/api/queryKeys';
import { ById } from '@/shared/types/api';
import { categoryAPI } from './api';
import {
  CategoryCreateRequest,
  CategoryResponse,
  CategoryUpdateRequest,
} from './types';

// 📌 카테고리 리스트 조회
export const useGetCategoryList = (
  options?: QueryOptions<CategoryResponse[]>,
) => {
  return useQuery<CategoryResponse[]>({
    queryKey: CATEGORY_QUERY_KEYS.list,
    queryFn: () => categoryAPI.getCategoryList(),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 카테고리 등록
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CategoryCreateRequest) =>
      categoryAPI.createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.list });
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 카테고리 수정
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: ById & { payload: CategoryUpdateRequest }) =>
      categoryAPI.updateCategory({ id }, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.list });
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 카테고리 삭제
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: ById) => categoryAPI.deleteCategory({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.list });
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};
