'use client';

import ReactDOM from 'react-dom';
import { useAtomValue } from 'jotai';
import { modalAtom } from '@/shared/atoms/modal/modal';
import RenderModal from './RenderModal';

const ModalPortal = () => {
  const modalList = useAtomValue(modalAtom);

  if (typeof window === 'undefined' && typeof document === 'undefined')
    return null;

  return ReactDOM.createPortal(
    <>
      {modalList.map((modal) => (
        <RenderModal key={modal.modalType} {...modal} />
      ))}
    </>,
    document.body,
  );
};

export default ModalPortal;
