/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMutation, useQuery} from '@tanstack/react-query';
import {graphQLClient} from '../client';
import {whitelistSpotsDocument} from '../queries/whitelist';
import {handleError} from '../utill';
import {PROFILE_BASEURL} from '@/constants/url';

export function useFetchWhitelistSpots(id?: string) {
  return useQuery({
    queryKey: ['whitelist', id],
    queryFn: async () => {
      const data = await graphQLClient.request<any>(whitelistSpotsDocument, {collectionId: id});
      return data?.whitelistPartner?.nodes;
    },
    // enabled: !!id,
    retry: false,
  });
}

export function useFetchLeaderboard() {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      try {
        const response = await fetch(PROFILE_BASEURL + '/user/leaderboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to get url');
        const data = await response.json();
        return data?.leaderboard;
      } catch (error) {
        handleError(error, 'Failed to get url');
        throw error;
      }
    },
    // enabled: !!id,
    retry: false,
  });
}

export function useRegisterWhitelist() {
  return useMutation({
    mutationFn: async (token: string) => {
      try {
        const response = await fetch(PROFILE_BASEURL + '/user/register-whitelist', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to get url');
        const data = await response.json();
        return data;
      } catch (error) {
        handleError(error, 'Failed to get url');
        throw error;
      }
    },
  });
}
