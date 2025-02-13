import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TEST_QUERY_KEYS } from '@/services/queryKeys';
import { authService } from '../authService';

type TestResponse = { id: string; label: string };

export const useUpdateTestResponseMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TestResponse[], Error, { data: TestResponse }>({
    mutationFn: (params) =>
      authService.updateSingleSelectResponse(params).then((res) => res),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [...TEST_QUERY_KEYS.detail, variables.data.id],
      });
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });

  return mutation;
};
