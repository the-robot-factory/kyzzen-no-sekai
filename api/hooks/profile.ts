/* eslint-disable @typescript-eslint/no-explicit-any */
import {useQuery} from '@tanstack/react-query';
import {userProfileDocument} from '../queries/profile';
import {graphQLClient} from '../client';
import {PROFILE_BASEURL} from '@/constants/url';
import {handleError} from '../utill';

export function useFetchProfile(id: string) {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const data = await graphQLClient.request<any>(userProfileDocument, {id});
      return data?.profile?.nodes[0];
    },
    enabled: !!id,
    retry: false,
  });
}

export function useFetchEligibleCommunities(token: string) {
  return useQuery({
    queryKey: ['eligible communities', token],
    queryFn: async () => {
      try {
        const response = await fetch(PROFILE_BASEURL + '/user/fetch_user_communities', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data?.data;
      } catch (error: unknown) {
        handleError(error, (error as Error)?.message ?? 'Failed to register');
        throw error;
      }
    },
    enabled: !!token,
    retry: false,
  });
}


export function useFetchPointBreakdown(token: string) {
  return useQuery({
    queryKey: ['point breakdown', token],
    queryFn: async () => {
      try {
        const response = await fetch(PROFILE_BASEURL + '/user/get_profile_point_data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data?.data;
      } catch (error: unknown) {
        handleError(error, (error as Error)?.message ?? 'Failed to register');
        throw error;
      }
    },
    enabled: !!token,
    retry: false,
  });
}