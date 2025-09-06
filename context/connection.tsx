/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useContext, useEffect, useState} from 'react';
import {clusterApiUrl, Connection, Keypair} from '@solana/web3.js';

import {useWallet} from './wallet';
import {TokenListProvider, ENV as ChainID, TokenInfo} from '@solana/spl-token-registry';
import {useLocalStorageState} from '@/hooks/useStorage';

export type ENV = 'mainnet' | 'testnet' | 'devnet' | 'localnet';

export enum SequenceType {
  Sequential,
  Parallel,
  StopOnFailure,
}

export const ENDPOINTS = [
  {
    name: 'mainnet' as ENV,
    endpoint: 'https://nd-183-619-919.p2pify.com/dc8333733604e4a1a743b484df46955b/',
    chainID: ChainID.MainnetBeta,
  },
  {
    name: 'testnet' as ENV,
    endpoint: clusterApiUrl('testnet'),
    chainID: ChainID.Testnet,
  },
  {
    name: 'devnet' as ENV,
    endpoint: clusterApiUrl('devnet'),
    chainID: ChainID.Devnet,
  },
  {
    name: 'localnet' as ENV,
    endpoint: 'http://127.0.0.1:8899',
    chainID: ChainID.Devnet,
  },
];

const DEFAULT = ENDPOINTS[0].endpoint;
const DEFAULT_SLIPPAGE = 0.25;

interface ConnectionConfig {
  connection: Connection | undefined;
  sendConnection?: Connection | undefined;
  endpoint: string;
  slippage: number;
  setSlippage: (val: number) => void;
  env: ENV;
  setEndpoint: (val: string) => void;
  tokens: TokenInfo[];
  tokenMap: Map<string, TokenInfo>;
}

const ConnectionContext = React.createContext<ConnectionConfig>({
  endpoint: DEFAULT,
  setEndpoint: () => {},
  slippage: DEFAULT_SLIPPAGE,
  setSlippage: () => {},
  connection: undefined,
  sendConnection: undefined,
  env: ENDPOINTS[0].name,
  tokens: [],
  tokenMap: new Map<string, TokenInfo>(),
});

export function ConnectionProvider({children = undefined as any}) {
  const [endpoint, setEndpoint] = useLocalStorageState('connectionEndpoint', ENDPOINTS[0].endpoint);
  const {connected} = useWallet();

  const [slippage, setSlippage] = useLocalStorageState('slippage', DEFAULT_SLIPPAGE.toString());

  const [connection, setConnection] = useState<Connection | undefined>(undefined);
  const [sendConnection, setSendConnection] = useState<Connection | undefined>(undefined);

  const chain = ENDPOINTS.find(end => end.endpoint === endpoint) || ENDPOINTS[0];
  const env = chain.name;

  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  // async function getToken(): Promise<string> {
  //   // Logic to get an auth token
  //   const req = await fetch(APIURL.QUICKNODE_AUTH)
  //   const { access_token }: { access_token: string } = await req.json()
  //   // console.log("token is", access_token)
  //   return access_token
  // }

  //not sure if the tokenExpiry is measured in milliseconds

  useEffect(() => {
    if (endpoint && !connection && !sendConnection) {
      setConnection(
        new Connection(endpoint, {
          wsEndpoint: 'wss://ws-nd-183-619-919.p2pify.com/dc8333733604e4a1a743b484df46955b',
        }),
      );
      setSendConnection(
        new Connection(endpoint, {
          wsEndpoint: 'wss://ws-nd-183-619-919.p2pify.com/dc8333733604e4a1a743b484df46955b',
        }),
      );
    }
  }, [endpoint]);

  useEffect(() => {
    // fetch token files
    new TokenListProvider().resolve().then((container: any) => {
      const list = container
        .excludeByTag('nft')
        .filterByChainId(ENDPOINTS.find(end => end.endpoint === endpoint)?.chainID || ChainID.MainnetBeta)
        .getList();

      const knownMints = [...list].reduce((map, item) => {
        map.set(item.address, item);
        return map;
      }, new Map<string, TokenInfo>());

      setTokenMap(knownMints);
      setTokens(list);
    });
  }, [env]);

  // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
  // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
  // This is a hack to prevent the list from every getting empty
  useEffect(() => {
    let id: number;
    (async () => {
      if (connection && connected) {
        id = await connection.onAccountChange(Keypair.generate().publicKey, () => {});
        if (id) {
          await connection?.removeAccountChangeListener(id);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  useEffect(() => {
    (async () => {
      let id: number;
      if (connection && connected) {
        id = await connection.onSlotChange(() => {});
        if (id) {
          await connection?.removeSlotChangeListener(id);
        }
      }
    })();
  }, [connection]);

  return (
    <ConnectionContext.Provider
      value={{
        endpoint,
        setEndpoint,
        slippage: parseFloat(slippage),
        setSlippage: val => setSlippage(val.toString()),
        connection: connection,
        sendConnection: sendConnection,
        tokens,
        tokenMap,
        env,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  return useContext(ConnectionContext).connection as Connection;
}

export function useSendConnection() {
  return useContext(ConnectionContext)?.sendConnection;
}

export function useConnectionConfig() {
  const context = useContext(ConnectionContext);
  return {
    endpoint: context.endpoint,
    setEndpoint: context.setEndpoint,
    env: context.env,
    tokens: context.tokens,
    tokenMap: context.tokenMap,
  };
}

export function useSlippageConfig() {
  const {slippage, setSlippage} = useContext(ConnectionContext);
  return {slippage, setSlippage};
}
