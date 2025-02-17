import base58 from 'bs58';
import {PROFILE_BASEURL} from '@/constants/url';
import {SignInResponse, WALLET_PROVIDERS_TYPE} from '@/types/types';
import {useMutation} from '@tanstack/react-query';
import {handleError, handleSuccess} from './utill';
import {WALLET_PROVIDERS} from '@/context/wallet';

export function useConnectAndSignMessage() {
  return useMutation({
    mutationFn: async (provider: WALLET_PROVIDERS_TYPE) => {
      try {
        const walletProviderDetails = WALLET_PROVIDERS.find(({name}) => name.toLowerCase() === provider);
        if (!walletProviderDetails) return;

        // const wallet = new walletProviderDetails.adapter(
        //   walletProviderDetails.url
        // )

        const wallet = new walletProviderDetails.adapter({
          network: walletProviderDetails.url,
        });

        if (!wallet) return;

        await wallet.connect();

        const message = await getMessage(wallet.publicKey?.toString() || '');

        const signedMessage = await wallet.signMessage(new TextEncoder().encode(message));

        const data = await verifySignature({
          address: wallet.publicKey?.toString() || '',
          signature: base58.encode(signedMessage),
        });

        return {...data, address: wallet.publicKey?.toString()};
      } catch (err) {
        console.log(err);
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

export const getMessage = async (address: string): Promise<string> => {
  const res = await fetch(`${PROFILE_BASEURL}/user/get_random_string`, {
    method: 'POST',
    body: JSON.stringify({address}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data.random_string;
};

export const verifySignature = async (payload: {address: string; signature: string}): Promise<SignInResponse> => {
  const res = await fetch(`${PROFILE_BASEURL}/user/verify_signature`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
};
