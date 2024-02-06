import { SupportedChainIds } from './types';
import { EIP1193Provider } from '@web3-onboard/core';

export enum ValidateState {
  NOT_VALIDATED = 'NOT_VALIDATED',
  VALIDATED = 'VALIDATED',
  ERROR = 'ERROR',
}

export const validateWalletNetwork = (walletAddress: string | undefined, rawChainId: string | undefined) => {
  if (walletAddress && rawChainId && rawChainId.toLowerCase() === SupportedChainIds.SEPOLIA_TESTNET) {
    return true;
  }
  return false;
};
