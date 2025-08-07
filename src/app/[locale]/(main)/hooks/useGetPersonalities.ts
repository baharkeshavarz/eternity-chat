import { GET_USER_PERSONALITIES_LIST_KEY } from '@/constants/query-keys';
import { getListPersonalities } from '@/services/personality';
import { useQuery } from '@tanstack/react-query';

interface GetPersonalitiesProps {
  user_id?: string | null;
}

const useGetPersonalities = ({ user_id }: GetPersonalitiesProps) => {
  const query = useQuery({
    queryKey: [GET_USER_PERSONALITIES_LIST_KEY, user_id],
    queryFn: async () => {
      const { data } = await getListPersonalities({
        params: { user_id },
      });
      return data;
    },
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
  });

  return query;
};

export default useGetPersonalities;
