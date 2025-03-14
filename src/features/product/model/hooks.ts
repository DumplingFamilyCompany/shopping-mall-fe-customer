import {
  keepPreviousData,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { PRODUCT_QUERY_KEYS } from '@/shared/api/queryKeys';
import { ById } from '@/shared/types/api';
import { productAPI } from './api';
import {
  ProductCreateRequest,
  ProductRankRequest,
  ProductResponse,
  ProductUpdateRequest,
  ProductVisibilityRequest,
} from './types';

// 📌 상품 리스트 조회
export const useGetProductList = (
  options?: QueryOptions<ProductResponse[]>,
) => {
  return useQuery<ProductResponse[]>({
    queryKey: PRODUCT_QUERY_KEYS.list,
    queryFn: () => productAPI.getProductList(),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 상품 상세 조회
export const useGetProductDetail = (
  { id }: ById,
  options?: QueryOptions<ProductResponse>,
) => {
  return useQuery<ProductResponse>({
    queryKey: PRODUCT_QUERY_KEYS.detail,
    queryFn: () => productAPI.getProductDetail({ id }),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 상품 등록
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: { payload: ProductCreateRequest }) =>
      productAPI.createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.list });
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 상품 수정
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: ById & { payload: ProductUpdateRequest }) =>
      productAPI.updateProduct({ id }, payload),
    onSuccess: (_, variables) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.list }),
        queryClient.invalidateQueries({
          queryKey: [...PRODUCT_QUERY_KEYS.detail, variables.id],
        }),
      ]);
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 상품 순위 수정
export const useUpdateProductRank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: ById & { payload: ProductRankRequest }) =>
      productAPI.updateProductRank({ id }, payload),
    onSuccess: (_, variables) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.list }),
        queryClient.invalidateQueries({
          queryKey: [...PRODUCT_QUERY_KEYS.detail, variables.id],
        }),
      ]);
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 상품 노출 여부 순위 수정
export const useUpdateProductVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: ById & { payload: ProductVisibilityRequest }) =>
      productAPI.updateProductVisibility({ id }, payload),
    onSuccess: (_, variables) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.list }),
        queryClient.invalidateQueries({
          queryKey: [...PRODUCT_QUERY_KEYS.detail, variables.id],
        }),
      ]);
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 상품 삭제
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: ById) => productAPI.deleteProduct({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.list });
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};
