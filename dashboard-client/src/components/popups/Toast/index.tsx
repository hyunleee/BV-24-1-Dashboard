import { PropsWithChildren, useContext } from 'react';
import { ToastContext } from '@/store/GlobalContext';
import s from './index.module.scss';

export default function Toast({ children }: PropsWithChildren) {
  const [, setToastContext] = useContext(ToastContext);
  const clearToast = () => {
    setToastContext(null);
  };

  return (
    <div className={s.default_toast} tabIndex={0} onAnimationEnd={clearToast}>
      {children}
    </div>
  );
}
