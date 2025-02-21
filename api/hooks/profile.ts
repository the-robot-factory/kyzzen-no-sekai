/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { userProfileDocument } from '../queries/profile';
import { graphQLClient } from '../client';



export function useFetchProfile(id: string) {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const data = await graphQLClient.request<any>(userProfileDocument, { id });
      return data?.profile?.nodes[0];
    },
    enabled: !!id,
    retry: false,
  });
}
