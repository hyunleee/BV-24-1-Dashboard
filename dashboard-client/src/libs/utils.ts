import { ethers } from 'ethers';

export const addressToDetNum = (walletAddress: string, maxValue: number) => {
  const parsedHashValue = ethers.utils.keccak256(walletAddress).slice(-6);
  const decimal = parseInt(parsedHashValue, 16);
  return (decimal % maxValue) + 1;
};

export const reviseAddress = (walletAddress: string) => {
  return walletAddress.slice(0, 6).concat('...').concat(walletAddress.slice(-4));
};
