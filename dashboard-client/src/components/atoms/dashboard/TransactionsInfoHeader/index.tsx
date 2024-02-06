import s from './index.module.scss';

export default function TransactionsInfoHeader() {
  return (
    <div className={s.headers}>
      <div className={s.asset}>자산</div>
      <div className={s.target_address}>거래 대상 주소</div>
      <div className={s.amount}>금액</div>
      <div className={s.date}>거래 날짜</div>
    </div>
  );
}
