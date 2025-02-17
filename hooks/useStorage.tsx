/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useCallback, useEffect} from 'react';

export function useLocalStorageState(key: string, defaultState?: string) {
  const [state, setState] = useState<any>();

  const setLocalStorageState = useCallback(
    (newState: any) => {
      const changed = state !== newState;
      if (!changed) {
        return;
      }
      setState(newState);
      if (newState === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newState));
      }
    },
    [state, key],
  );
  const getLocalStorageState = useCallback(() => {
    const storedState = localStorage.getItem(key);
    try {
      if (storedState) {
        return JSON.parse(storedState);
      } else {
        throw new Error();
      }
    } catch {
      return defaultState;
    }
  }, [key, defaultState]);

  useEffect(() => {
    setState(getLocalStorageState());
  }, [key, defaultState]);

  return [state, setLocalStorageState];
}
