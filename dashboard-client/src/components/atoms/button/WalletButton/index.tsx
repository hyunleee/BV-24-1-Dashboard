import Button from '../Button';
import s from './index.module.scss';
import { WalletType } from '@/libs/types';
import { reviseAddress } from '@/libs/utils';
import Coinbase from '@/public/assets/Coinbase.png';
import Metamask from '@/public/assets/Metamask.png';
import WalletIcon from '@/public/assets/Wallet.png';
import Image from 'next/image';
import { ComponentProps } from 'react';

export interface WalletButtonProps extends ComponentProps<typeof Button> {
  walletType: WalletType;
  isConnected: boolean;
  address?: string;
}

function getIcon(isConnected: boolean, walletType: WalletType) {
  if (!isConnected) return <Image src={WalletIcon} alt="NotConnected" width={14} height={14}></Image>;
  switch (walletType) {
    case WalletType.METAMASK:
      return <Image src={Metamask} alt="Metamask" width={14} height={14}></Image>;
    case WalletType.COINBASE:
      return <Image src={Coinbase} alt="Coinbase" width={14} height={14}></Image>;
    default:
      return <Image src={WalletIcon} alt="OtherWallet" width={14} height={14}></Image>;
  }
}

export default function WalletButton(props: WalletButtonProps) {
  return (
    <Button className={s.wallet_button} onClick={props.onClick}>
      {getIcon(props.isConnected, props.walletType)}
      <div className={s.wallet_button_text}>{props.isConnected ? reviseAddress(props.address!) : '지갑 연결'}</div>
    </Button>
  );
}
