/* eslint-disable @typescript-eslint/no-explicit-any */
import Wallet from '@project-serum/sol-wallet-adapter';
import type {PublicKey} from '@solana/web3.js';
import {Transaction} from '@solana/web3.js';
import EventEmitter from 'eventemitter3';
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {SolflareWalletAdapter} from '../wallet-adapters/solflare';
import {PhantomWalletAdapter} from '@/wallet-adapters/phantom';

import {toast} from 'react-toastify';
import {useLocalStorageState} from '@/hooks/useStorage';
import {useConnectionConfig} from './connection';

const ASSETS_URL = 'https://raw.githubusercontent.com/solana-labs/oyster/main/assets/wallets/';
export const WALLET_PROVIDERS = [
  {
    name: 'Phantom',
    url: 'https://phantom.app/',
    icon: `data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iLjUiIHgyPSIuNSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1MzRiYjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NTFiZjkiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9Ii41IiB4Mj0iLjUiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii44MiIvPjwvbGluZWFyR3JhZGllbnQ+PGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgZmlsbD0idXJsKCNhKSIgcj0iMTciLz48cGF0aCBkPSJtMjkuMTcwMiAxNy4yMDcxaC0yLjk5NjljMC02LjEwNzQtNC45NjgzLTExLjA1ODE3LTExLjA5NzUtMTEuMDU4MTctNi4wNTMyNSAwLTEwLjk3NDYzIDQuODI5NTctMTEuMDk1MDggMTAuODMyMzctLjEyNDYxIDYuMjA1IDUuNzE3NTIgMTEuNTkzMiAxMS45NDUzOCAxMS41OTMyaC43ODM0YzUuNDkwNiAwIDEyLjg0OTctNC4yODI5IDEzLjk5OTUtOS41MDEzLjIxMjMtLjk2MTktLjU1MDItMS44NjYxLTEuNTM4OC0xLjg2NjF6bS0xOC41NDc5LjI3MjFjMCAuODE2Ny0uNjcwMzggMS40ODQ3LTEuNDkwMDEgMS40ODQ3LS44MTk2NCAwLTEuNDg5OTgtLjY2ODMtMS40ODk5OC0xLjQ4NDd2LTIuNDAxOWMwLS44MTY3LjY3MDM0LTEuNDg0NyAxLjQ4OTk4LTEuNDg0Ny44MTk2MyAwIDEuNDkwMDEuNjY4IDEuNDkwMDEgMS40ODQ3em01LjE3MzggMGMwIC44MTY3LS42NzAzIDEuNDg0Ny0xLjQ4OTkgMS40ODQ3LS44MTk3IDAtMS40OS0uNjY4My0xLjQ5LTEuNDg0N3YtMi40MDE5YzAtLjgxNjcuNjcwNi0xLjQ4NDcgMS40OS0xLjQ4NDcuODE5NiAwIDEuNDg5OS42NjggMS40ODk5IDEuNDg0N3oiIGZpbGw9InVybCgjYikiLz48L3N2Zz4K`,
    adapter: PhantomWalletAdapter,
  },
  {
    name: 'Solflare',
    url: 'https://solflare.com/access-wallet',
    icon: `${ASSETS_URL}solflare.svg`,
    adapter: SolflareWalletAdapter,
  },
];

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signMessage(message: Uint8Array): Promise<Uint8Array>;
  connect: () => any;
  disconnect: () => any;
  signAllTransactions?: (transactions: Transaction[]) => Promise<Transaction[]>;
  //  publicKey: () => PublicKey | null;
  _eventsCount?: any;
}

const WalletContext = React.createContext<{
  wallet: WalletAdapter | undefined;
  connected: boolean;
  select: () => void;
  provider: (typeof WALLET_PROVIDERS)[number] | undefined;
}>({
  wallet: undefined,
  connected: false,
  select() {},
  provider: undefined,
});

export function WalletProvider({children = null as any}) {
  const {endpoint} = useConnectionConfig();
  const [autoConnect, setAutoConnect] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [providerUrl, setProviderUrl] = useLocalStorageState('walletProvider');

  const provider = useMemo(() => WALLET_PROVIDERS.find(({url}) => url === providerUrl), [providerUrl]);

  const wallet = useMemo(
    function () {
      if (provider) {
        return new (provider.adapter || Wallet)(
          providerUrl,
          // @ts-expect-error // to find solution to this ignore bug
          endpoint,
        ) as unknown as WalletAdapter;
      }
    },
    [provider, providerUrl, endpoint],
  );

  const [connected, setConnected] = useState(false);

  // const walletKeys: any = [
  //   "DgFFCrG6wYszTgJMLtAjB1s9WEXBNQGdbpkCatL86J1C",
  //   "5DYsvcHQB1UA5yUE3vs4tqfSwDKAXLzK11hmKwafmvF4",
  //   "AcSkY4LJ8PZgphtM7rRUVKUCKzp29AeKAhY25q18FPi5",
  //   "2395Sz8o1UZeLi4z2aLdBH2Bqb1NHc18pFncKSDNjnkH",
  //   "FQKQfoXqSyB7XqBJ8zrqFq8LJq2QPkW8ZMMyPfhfbyjv",
  //   "FwZjNeoH2M8uiGXGrSGojU6ongqYB5LhBpFPK9a87Fqp",
  //   "TTzpGMsvG2xesYifQ2hEEqL8NVvdbUrJK72w76dK8ym",
  //   "BR4YrxUDUaUERFCyvUyf29Lcaii6yHJYGoiuk8cRakZaa",
  //   "EUe7HSm4KDEQymnyShEUopbVBsYbviizet7Z5acDjJqE",
  //   "4C1pg9v7RYtbkppgYJueVBQt4hMtETQuvKoJDd6gWXpe",
  //   "9UJjtuPXYMgHvZv73KC6ggd82rdmfBZ4ieFGmD5er6Kj",
  //   "HVGh9nDspWjTzQFwVSZciTa1TAQcze6jHgUNUkrPzfmc",
  //   "DgFFCrG6wYszTgJMLtAjB1s9WEXBNQGdbpkCatL86J1C",
  //   "FwZjNeoH2M8uiGXGrSGojU6ongqYB5LhBpFPK9a87Fqp",
  //   "E5XRnqBVef15df2xqwcVZGVmZ9nGgYWEmqHi9kw3wSfV",
  //   "GR25yxnyUSL8wkC16SyUChv6vSqD19qFvLfD8u8QNSm1",
  //   "BR4YrxUDUaUERFCyvUyf29Lcaii6yHJYGoiuk8cRakZa",
  //   "4t6h3YFjUYRbeH8osGTmpX2NaESKhnmceNwd2pBkK83J",
  //   "HEsu8aQcSffKCXBSwqKbcuMkGnofyBWAL4nFsj3NrajH",
  //   "8dAh8RVmzgEPfQeTR1USXqeMB5t6DwY9ebRGDu2oR7rG",
  //   "5M88ooLGgrydHWpi9KctxQtutF7SGy186HHzc8EfDPRt",
  //   ...whitelist,
  // ]

  useEffect(() => {
    if (wallet) {
      wallet.on('connect', () => {
        if (wallet?.publicKey) {
          setConnected(true);
          toast.success(`Connected to wallet `);
        } else {
          toast.error('Wallet address not whitelisted');
        }
      });

      wallet.on('disconnect', () => {
        setConnected(false);
        toast.success('Disconnected from wallet');
      });
    }

    return () => {
      if (wallet) {
        wallet.disconnect();
      }
      setConnected(false);
    };
  }, [wallet]);

  useEffect(() => {
    if (wallet && autoConnect) {
      wallet.connect();
      setAutoConnect(true);
    }

    return () => {};
  }, [wallet, autoConnect]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const select = useCallback(() => {
    setIsModalVisible(!isModalVisible);
    localStorage.removeItem('walletProvider');
  }, []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connected,
        select,
        provider,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const {wallet, connected, provider, select} = useContext(WalletContext);

  return {
    wallet,
    connected,
    provider,
    select,
    publicKey: wallet?.publicKey,
    connect() {
      if (wallet) {
        return wallet.connect();
      }
      return select();
    },
    disconnect() {
      if (wallet) {
        wallet.disconnect();
      }
    },
  };
}
