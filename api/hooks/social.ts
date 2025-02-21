import {PROFILE_BASEURL} from '@/constants/url';
import {SOCIAL_PROVIDERS_TYPE} from '@/types/types';
import {useMutation} from '@tanstack/react-query';
import {handleError, handleSuccess} from '../utill';

type Auth = {
  provider: SOCIAL_PROVIDERS_TYPE;
  redirect_url: string;
};

export function useAuthUrl() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Auth) => {
      try {
        localStorage.setItem('provider', payload.provider);
        const response = await fetch(PROFILE_BASEURL + '/user/get_oauth_url', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to get url');
        const data = await response.json();
        return data;
      } catch (error) {
        handleError(error, 'Failed to get url');
        throw error;
      }
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleSuccess('Url created successfully!');
    },
    onError: error => {
      handleError(error, 'Failed to create url');
    },
  });
}

export function useVerifyAuth() {
  return useMutation({
    mutationFn: async ({
      provider,
      code,
      redirect_url,
      login,
    }: {
      provider: SOCIAL_PROVIDERS_TYPE;
      code: string;
      redirect_url: string;
      login?: boolean;
    }) => {
      try {
        const response = await fetch(`${PROFILE_BASEURL}/user/oauth_callback`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            provider,
            code,
            redirect_url,
            login: Boolean(login),
          }),
        });
        if (!response.ok) throw new Error('Failed to verify auth');
        const data = await response.json();
        return data;
      } catch (err) {
        handleError(err);
      }
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleSuccess('Url created successfully!');
    },
    onError: error => {
      handleError(error, 'Failed to create url');
    },
  });
}
