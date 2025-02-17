import {COOKIES_KEYS} from '@/constants/cookies';
import {useCookies} from '@/hooks/useCookies';
import {createContext, FC, useContext, useMemo} from 'react';

type UserContextType = {
  userSession?: {token: string; id: string};
  createSession: (token: string, id: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  createSession: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: FC<{children: React.ReactNode}> = ({children}) => {
  const {setData, data, deleteData} = useCookies(COOKIES_KEYS.SESSION_KEY);

  const userSession = useMemo(() => {
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, [data]);

  const createSession = (token: string, id: string) => {
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); //24 hr

    setData(JSON.stringify({token, id}), expiresAt);
  };

  return <UserContext.Provider value={{userSession, createSession, logout: deleteData}}>{children}</UserContext.Provider>;
};

export default UserProvider;
