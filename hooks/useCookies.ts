import {useCallback, useEffect, useMemo, useState} from 'react';
import {CookieKeys} from '@/types/types';

export class CookieStorage {
  static get(key: CookieKeys) {
    if (typeof window !== 'undefined') {
      const value = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${key}=`))
        ?.split('=')[1];

      return value ? decodeURIComponent(value) : null;
    }

    return localStorage.getItem(key);
  }

  static set(key: CookieKeys, value: string, expires?: Date) {
    if (typeof window !== 'undefined') {
      const expireDate = expires ? `; expires=${expires.toUTCString()}` : '';
      document.cookie = `${key}=${value}${expireDate}; Path=/; Secure`;
    }
    localStorage.setItem(key, value);
  }

  static has(key: CookieKeys) {
    if (typeof window !== 'undefined') {
      return document.cookie.split(';').some(item => item.trim().startsWith(`${key}=`));
    }

    return false;
  }

  static unset(key: CookieKeys) {
    if (typeof window !== 'undefined') {
      document.cookie = `${key}=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    localStorage.removeItem(key);
  }
}

export function useCookies(key: CookieKeys, fallback?: string) {
  const [_data, _setData] = useState<string | null>('{}');

  useEffect(() => {
    const rawData = CookieStorage.get(key);
    if (rawData !== null) {
      _setData(rawData);
    } else if (fallback !== undefined) {
      _setData(fallback);
    } else {
      _setData(null);
    }
  }, [fallback, key]);

  const setData = useCallback(
    (data: string, expires: Date | undefined) => {
      CookieStorage.set(key, data, expires);
      _setData(data);
    },
    [key],
  );

  const deleteData = useCallback(() => {
    CookieStorage.unset(key);

    if (fallback !== undefined) {
      _setData(fallback);
    } else {
      _setData(null);
    }
  }, [fallback, key]);

  return useMemo(() => ({data: _data, setData, deleteData}), [_data, setData, deleteData]);
}
