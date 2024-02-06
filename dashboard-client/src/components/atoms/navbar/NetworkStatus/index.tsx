import { UIProps } from '../../props';
import s from './index.module.scss';
import InvalidNetwork from '@/public/assets/InvalidNetwork.png';
import ValidNetwork from '@/public/assets/ValidNetwork.png';
import Image from 'next/image';

export interface NetworkStatusProps extends UIProps.Div {
  isProperNetwork: boolean;
}

export default function NetworkStatus({ isProperNetwork }: NetworkStatusProps) {
  return (
    <div className={s.network_status}>
      {isProperNetwork ? (
        <>
          <div className={s.network_status_text}>Sepolia Testnet</div>
          <Image src={ValidNetwork} alt="valid" width={17} height={17} />
        </>
      ) : (
        <>
          <div className={s.network_status_invalid_text}>Invalid Network</div>
          <Image src={InvalidNetwork} alt="invalid" width={17} height={17} />
        </>
      )}
    </div>
  );
}
