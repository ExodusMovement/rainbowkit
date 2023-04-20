/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { Ethereum } from '@wagmi/core';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface ExodusOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

interface ExodusProvider {
  ethereum: Ethereum;
}

type ExodusWindow = Window & { exodus?: ExodusProvider };

export const exodusWallet = ({
  chains,
  shimDisconnect,
}: ExodusOptions): Wallet => ({
  id: 'exodus',
  name: 'Exodus',
  iconUrl: async () => (await import('./exodusWallet.svg')).default,
  iconBackground: '#fff',
  installed:
    typeof window !== 'undefined' &&
    (window as ExodusWindow)?.exodus?.ethereum !== undefined,
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/exodus/aholpfdialjgjfhomihkjbmgjidlcdno',
  },
  createConnector: () => {
    return {
      connector: new InjectedConnector({
        chains,
        options: {
          shimDisconnect,
          getProvider: () =>
            typeof window !== 'undefined'
              ? (window as ExodusWindow)?.exodus?.ethereum
              : undefined,
        },
      }),
    };
  },
});
