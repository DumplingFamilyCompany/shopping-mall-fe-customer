import {
  keepPreviousData,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { TEST_QUERY_KEYS } from '@/services/queryKeys';
import { AuthService } from '../authService';

type TestResponse = { id: string; name: string };

export const useGetMultiSelectResponseQuery = (
  options?: Omit<UseQueryOptions<TestResponse[]>, 'queryKey' | 'queryFn'>,
) => {
  const authService = AuthService.getInstance();

  const query = useQuery<TestResponse[]>({
    queryKey: [...TEST_QUERY_KEYS.detail],
    queryFn: async () => authService.getTestUserList().then((res) => res),
    placeholderData: keepPreviousData,
    ...options,
  });

  return query;
};
