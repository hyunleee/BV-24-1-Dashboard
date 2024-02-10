import { UIProps } from '../../props';
import s from './index.module.scss';
import { NoticeType } from '@/libs/types';
import NotConnectedIcon from '@/public/assets/NotConnectedIcon.png';
import NotFoundIcon from '@/public/assets/NotFoundIcon.png';
import Image from 'next/image';

export interface NoticeProps extends UIProps.Div {
  noticeType: NoticeType;
}

export const getNoticeElement = (noticeType: NoticeType) => {
  switch (noticeType) {
    case NoticeType.ASSET_WALLET_NOT_CONNECTED:
      return {
        icon: NotConnectedIcon,
        iconAlt: 'NotConnectedIcon',
        message: '아직 자산을 확인할 수 없어요.',
        subMessage: '지갑을 연결해 모든 자산을 확인하세요.',
      };
    case NoticeType.TRANSACTION_WALLET_NOT_CONNECTED:
      return {
        icon: NotConnectedIcon,
        iconAlt: 'NotConnectedIcon',
        message: '아직 거래 기록을 확인할 수 없어요.',
        subMessage: '지갑을 연결해 모든 거래 기록을 확인하세요.',
      };
    default:
      return {
        icon: NotFoundIcon,
        iconAlt: 'NotFoundIcon',
        message: '거래 기록이 존재하지 않아요.',
      };
  }
};

export default function Notice({ noticeType }: NoticeProps) {
  const { icon, iconAlt, message, subMessage } = getNoticeElement(noticeType);

  return (
    <div className={s.notice_container}>
      <Image src={icon} alt={iconAlt} width={30} height={30} />
      <div className={s.notice_content}>
        <div className={s.message}>{message}</div>
        {subMessage && <div className={s.sub_message}>{subMessage}</div>}
      </div>
    </div>
  );
}
