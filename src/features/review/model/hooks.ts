import {
  keepPreviousData,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { REVIEW_QUERY_KEYS } from '@/shared/api/queryKeys';
import { ById } from '@/shared/types/api';
import { reviewAPI } from './api';
import { ReviewReplyRequest, ReviewResponse } from './types';

// 📌 리뷰 리스트 조회
export const useGetReviewList = (options?: QueryOptions<ReviewResponse[]>) => {
  return useQuery<ReviewResponse[]>({
    queryKey: REVIEW_QUERY_KEYS.list,
    queryFn: () => reviewAPI.getReviewList(),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 리뷰 답변 등록
export const useCreateReviewReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: ById & { payload: ReviewReplyRequest }) =>
      reviewAPI.createReviewReply({ id }, payload),
    onSuccess: (_, variables) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: REVIEW_QUERY_KEYS.list }),
        queryClient.invalidateQueries({
          queryKey: [...REVIEW_QUERY_KEYS.detail, variables.id],
        }),
      ]);
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 메인 리뷰 설정
export const useUpdateMainReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: ById) => reviewAPI.updateMainReview({ id }),
    onSuccess: (_, variables) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: REVIEW_QUERY_KEYS.list }),
        queryClient.invalidateQueries({
          queryKey: [...REVIEW_QUERY_KEYS.detail, variables.id],
        }),
      ]);
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 리뷰 삭제
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: ById) => reviewAPI.deleteReview({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEW_QUERY_KEYS.list });
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};
