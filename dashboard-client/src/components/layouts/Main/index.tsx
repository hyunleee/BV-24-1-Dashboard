import s from './index.module.scss';

export default function Main({ children }: { children: React.ReactNode }) {
  return <main className={s.main}>{children}</main>;
}
