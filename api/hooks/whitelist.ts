/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { graphQLClient } from '../client';
import { whitelistSpotsDocument } from '../queries/whitelist';



export function useFetchWhitelistSpots(id?: string) {
    return useQuery({
        queryKey: ['whitelist', id],
        queryFn: async () => {
            const data = await graphQLClient.request<any>(whitelistSpotsDocument, { collectionId: id });
            return data?.whitelistSpotByCollection?.nodes;
        },
        // enabled: !!id,
        retry: false,
    });
}
