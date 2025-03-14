import { typedFetch } from '@/shared/api/apiClient';
import { ById, CommonResult } from '@/shared/types/api';
import { InquiryReplyRequest, InquiryResponse } from './types';

export const inquiryAPI = {
  // 📌 문의 리스트 조회
  getInquiryList: async () => {
    return typedFetch<InquiryResponse[]>(`/backend/api/v1/admin/inquiries`);
  },

  // 📌 문의 답변 등록
  createInquiryReply: async ({ id }: ById, payload: InquiryReplyRequest) => {
    return typedFetch<string>(
      `/backend/api/v1/admin/inquiries/${id}/reply`,
      'PUT',
      payload,
    );
  },

  // 📌 문의 삭제
  deleteInquiry: async ({ id }: ById) => {
    return typedFetch<CommonResult>(
      `/backend/api/v1/admin/inquiries/${id}`,
      'DELETE',
    );
  },
};
