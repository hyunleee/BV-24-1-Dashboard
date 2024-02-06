import { UIProps } from '../../props';
import s from './index.module.scss';
import { TabType } from '@/libs/types';
import CryptoGray from '@/public/assets/CryptoGray.png';
import CryptoWhite from '@/public/assets/CryptoWhite.png';
import NFTGray from '@/public/assets/NFTGray.png';
import NFTWhite from '@/public/assets/NFTWhite.png';
import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';

export interface TabProps extends UIProps.Div {
  tabType: TabType;
}

export default function Tab({ tabType }: TabProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={s.tab} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {tabType === TabType.TOKEN ? (
        <div className={s.tab_image}>
          <Image
            src={CryptoWhite}
            alt="crypto"
            className={`${s.image} ${isHovered ? s.fadeOut : ''}`}
            width={16}
            height={16}
          />
          <Image
            src={CryptoGray}
            alt="crypto"
            className={`${s.image} ${isHovered ? '' : s.fadeOut}`}
            width={16}
            height={16}
          />
        </div>
      ) : (
        <div className={s.tab_image}>
          <Image
            src={NFTWhite}
            alt="NFT"
            className={`${s.image} ${isHovered ? s.fadeOut : ''}`}
            width={16}
            height={16}
          />
          <Image
            src={NFTGray}
            alt="NFT"
            className={`${s.image} ${isHovered ? '' : s.fadeOut}`}
            width={16}
            height={16}
          />
        </div>
      )}
      <div className={s.tab_name}>{tabType === TabType.TOKEN ? '암호화폐' : 'NFT'}</div>
    </div>
  );
}
