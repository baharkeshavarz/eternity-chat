import { GET_USER_PERSONALITIES_LIST_KEY } from '@/constants/query-keys';
import { getListPersonalities } from '@/services/personality';
import { useQuery } from '@tanstack/react-query';

const useGetPersonalities = () => {
  const query = useQuery({
    queryKey: [GET_USER_PERSONALITIES_LIST_KEY],
    queryFn: async () => {
      const { data } = await getListPersonalities();
      return data;
    },
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
  });

  return query;
};

export default useGetPersonalities;
