'use client';
import {useAuthUrl} from '@/api/hooks/social';
import {SOCIAL_PROVIDERS_TYPE} from '@/types/types';
import React, {ReactNode, useContext} from 'react';

interface AuthContextType {
  linkAuth: (provider: SOCIAL_PROVIDERS_TYPE, redirect_url: string) => void;
}

const AuthContext = React.createContext<AuthContextType>({linkAuth: () => {}});
export const useAuth = () => {
  return useContext(AuthContext);
};
export function AuthProvider({children}: {children: ReactNode}) {
  const {mutateAsync: constructUrl} = useAuthUrl();

  const linkAuth = async (provider: SOCIAL_PROVIDERS_TYPE, redirect_url: string) => {
    const data = await constructUrl({provider, redirect_url});
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const value = {
    linkAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
