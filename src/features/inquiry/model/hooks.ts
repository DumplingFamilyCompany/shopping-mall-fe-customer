import {
  keepPreviousData,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { INQUIRY_QUERY_KEYS } from '@/shared/api/queryKeys';
import { ById } from '@/shared/types/api';
import { inquiryAPI } from './api';
import { InquiryReplyRequest, InquiryResponse } from './types';

// 📌 문의 리스트 조회
export const useGetInquiryList = (
  options?: QueryOptions<InquiryResponse[]>,
) => {
  return useQuery<InquiryResponse[]>({
    queryKey: INQUIRY_QUERY_KEYS.list,
    queryFn: () => inquiryAPI.getInquiryList(),
    placeholderData: keepPreviousData,
    ...options,
  });
};

// 📌 문의 답변 등록
export const useCreateInquiryReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: ById & { payload: InquiryReplyRequest }) =>
      inquiryAPI.createInquiryReply({ id }, payload),
    onSuccess: (_, variables) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: INQUIRY_QUERY_KEYS.list }),
        queryClient.invalidateQueries({
          queryKey: [...INQUIRY_QUERY_KEYS.detail, variables.id],
        }),
      ]);
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};

// 📌 문의 삭제
export const useDeleteInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: ById) => inquiryAPI.deleteInquiry({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INQUIRY_QUERY_KEYS.list });
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });
};
