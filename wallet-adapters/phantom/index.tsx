/* eslint-disable @typescript-eslint/no-explicit-any */
import {PublicKey, Transaction} from '@solana/web3.js';
import {
  WalletReadyState,
  EventEmitter,
  scopePollingDetectionStrategy,
  WalletConnectionError,
  WalletAccountError,
  WalletPublicKeyError,
  WalletDisconnectedError,
} from '@solana/wallet-adapter-base';
import {WalletAdapter} from '@/context/wallet';

type PhantomEvent = 'disconnect' | 'connect' | 'accountChanged';
// interface PhantomEvent {
//   connect(...args: unknown[]): unknown
//   disconnect(...args: unknown[]): unknown
//   accountChanged(newPublicKey: PublicKey): unknown
// }

type PhantomRequestMethod = 'connect' | 'disconnect' | 'signTransaction' | 'signAllTransactions';

interface PhantomProvider {
  isPhantom: boolean;
  isExodus: false;
  publicKey?: PublicKey;
  isConnected?: boolean;
  autoApprove?: boolean;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage(message: Uint8Array): Promise<Uint8Array>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  off: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<any>;
  listeners: (event: PhantomEvent) => (() => void)[];
}

interface PhantomWindow extends Window {
  phantom?: {
    solana?: PhantomProvider;
  };
  solana?: PhantomProvider;
}

declare const window: PhantomWindow;

export class PhantomWalletAdapter extends EventEmitter implements WalletAdapter {
  private _connecting: boolean;
  private _publicKey: PublicKey | null;
  private _wallet: PhantomProvider | null;
  private _readyState: WalletReadyState =
    typeof window === 'undefined' || typeof document === 'undefined'
      ? WalletReadyState.Unsupported
      : WalletReadyState.NotDetected;
  constructor() {
    super();
    this._connecting = false;
    this.connect = this.connect.bind(this);
    this._publicKey = null;
    this._wallet = null;

    if (this._readyState !== WalletReadyState.Unsupported) {
      scopePollingDetectionStrategy(() => {
        if (window.phantom?.solana?.isPhantom || window.solana?.isPhantom) {
          this._readyState = WalletReadyState.Installed;
          this.emit('readyStateChange', this._readyState);
          return true;
        }
        return false;
      });
    }
  }

  private get _provider(): PhantomProvider | undefined {
    if ((window as any)?.solana?.isPhantom) {
      return (window as any).solana;
    }
    return undefined;
  }

  private _handleConnect = (...args: any) => {
    this.emit('connect', ...args);
  };

  private _handleDisconnect = (...args: any) => {
    this.emit('disconnect', ...args);
  };

  get connected() {
    return this._provider?.isConnected || false;
  }

  get autoApprove() {
    return this._provider?.autoApprove || false;
  }

  get readyState() {
    return this._readyState;
  }

  get connecting() {
    return this._connecting;
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    if (!this._provider) {
      return message;
    }

    const signature: any = await this._provider.signMessage(message);

    return signature?.signature;
  }

  // eslint-disable-next-line
  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this._provider) {
      return transactions;
    }

    return this._provider.signAllTransactions(transactions);
  }

  get publicKey() {
    return this._provider?.publicKey ?? null;
  }

  // eslint-disable-next-line
  async signTransaction(transaction: Transaction) {
    if (!this._provider) {
      return transaction;
    }

    return this._provider.signTransaction(transaction);
  }

  async connect(): Promise<void> {
    try {
      if (this.connected || this.connecting) return;

      if (this.readyState === WalletReadyState.Loadable) {
        // redirect to the Phantom /browse universal link
        // this will open the current URL in the Phantom in-wallet browser
        const url = encodeURIComponent(window.location.href);
        const ref = encodeURIComponent(window.location.origin);
        window.location.href = `https://phantom.app/ul/browse/${url}?ref=${ref}`;
        return;
      }

      // if (this.readyState !== WalletReadyState.Installed)
      //   // throw new WalletNotReadyError()
      //   return

      this._connecting = true;
      console.log('window', window.phantom?.solana);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const wallet = window.phantom?.solana || window.solana!;

      if (!wallet.isConnected) {
        try {
          console.log('wallet', wallet);

          await wallet.connect();
        } catch (error: any) {
          throw new WalletConnectionError(error?.message, error);
        }
      }

      if (!wallet.publicKey) throw new WalletAccountError();

      let publicKey: PublicKey;
      try {
        publicKey = new PublicKey(wallet.publicKey.toBytes());
      } catch (error: any) {
        throw new WalletPublicKeyError(error?.message, error);
      }

      wallet.on('disconnect', this._disconnected);
      wallet.on('accountChanged', this._accountChanged);

      this._wallet = wallet;
      this._publicKey = publicKey;

      this.emit('connect', publicKey);
    } catch (error: any) {
      this.emit('error', error);
      throw error;
    } finally {
      this._connecting = false;
    }
  }


  disconnect() {
    if (this._wallet) {
      this._wallet.disconnect();
    }
  }

  private _disconnected = () => {
    const wallet = this._wallet;
    if (wallet) {
      wallet.off('disconnect', this._disconnected);
      wallet.off('accountChanged', this._accountChanged);

      this._wallet = null;
      this._publicKey = null;

      this.emit('error', new WalletDisconnectedError());
      this.emit('disconnect');
    }
  };

  private _accountChanged = (newPublicKey: PublicKey) => {
    const publicKey = this._publicKey;
    if (!publicKey) return;

    try {
      newPublicKey = new PublicKey(newPublicKey.toBytes());
    } catch (error: any) {
      this.emit('error', new WalletPublicKeyError(error?.message, error));
      return;
    }

    if (publicKey.equals(newPublicKey)) return;

    this._publicKey = newPublicKey;
    this.emit('connect', newPublicKey);
  };
}
