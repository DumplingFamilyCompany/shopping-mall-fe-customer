import { typedFetch } from '@/shared/lib/apiClient';
import { ById, CommonResult } from '@/shared/types/api';
import { ReviewReplyRequest, ReviewResponse } from './types';

export const reviewAPI = {
  // 📌 리뷰 리스트 조회
  getReviewList: async () => {
    return typedFetch<ReviewResponse[]>(`/backend/api/v1/admin/reviews`);
  },

  // 📌 리뷰 답변 등록
  createReviewReply: async ({ id }: ById, payload: ReviewReplyRequest) => {
    return typedFetch<string>(
      `/backend/api/v1/admin/reviews/${id}/reply`,
      'PUT',
      payload,
    );
  },

  // 📌 메인 리뷰 설정
  updateMainReview: async ({ id }: ById) => {
    return typedFetch<string>(
      `/backend/api/v1/admin/reviews/${id}/main`,
      'PUT',
    );
  },

  // 📌 리뷰 삭제
  deleteReview: async ({ id }: ById) => {
    return typedFetch<CommonResult>(
      `/backend/api/v1/admin/reviews/${id}`,
      'DELETE',
    );
  },
};
