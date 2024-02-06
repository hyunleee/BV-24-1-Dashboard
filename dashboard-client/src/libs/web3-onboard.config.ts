import { SupportedChainIds } from './types';
import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';

const injected = injectedModule();

const wallets = [injected];

const chains = [
  {
    id: SupportedChainIds.SEPOLIA_TESTNET,
    token: 'ETH',
    label: 'Sepolia Testnet',
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
  },
];

const appMetadata = {
  name: 'BV-2024-Dashboard',
  icon: '<svg>My App Icon</svg>',
  description: 'Dashboard toy project for 2024-1',
  recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io' }],
};

export const web3Onboard = init({
  wallets,
  chains,
  appMetadata,
  connect: {
    autoConnectLastWallet: true,
    showSidebar: false,
  },
});
