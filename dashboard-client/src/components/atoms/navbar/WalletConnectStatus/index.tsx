import WalletButton from '../../button/WalletButton';
import { UIProps } from '../../props';
import NetworkStatus from '../NetworkStatus';
import s from './index.module.scss';
import { SupportedChainIds, WalletType } from '@/libs/types';
import FetchingIcon from '@/public/assets/FetchingIcon.png';
import Image from 'next/image';

export interface WalletConnectStatusProps extends UIProps.Div {
  isFetching: boolean;
  walletAddress: string | undefined;
  chainId: string | undefined;
  onWalletConnect: () => void;
}

export default function WalletConnectStatus(props: WalletConnectStatusProps) {
  return (
    <div className={`${s.wallet_connect_status} ${props.isFetching ? s.isFetchingAnimation : ''}`}>
      {props.isFetching && <Image src={FetchingIcon} alt="fetching" className={s.loading} width={20} height={20} />}
      {!!props.chainId && <NetworkStatus isProperNetwork={props.chainId === SupportedChainIds.SEPOLIA_TESTNET} />}
      <WalletButton
        walletType={WalletType.METAMASK}
        isConnected={!!props.walletAddress}
        address={props.walletAddress}
        onClick={props.onWalletConnect}
      />
    </div>
  );
}
