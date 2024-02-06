import { ModalContext, ToastContext } from '@/store/GlobalContext';
import { useContext } from 'react';

export default function Popup() {
  const [modal] = useContext(ModalContext);
  const [toast] = useContext(ToastContext);

  return (
    <>
      {modal}
      {toast}
    </>
  );
}
