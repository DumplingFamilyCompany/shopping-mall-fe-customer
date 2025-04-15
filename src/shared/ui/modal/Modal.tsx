'use client';

import useModal from '@/shared/hooks/useModal';
import Icon from '../icon/Icon';
import Typography from '../typography/Typography';
import { ModalContext, useModalContext } from './modal.context';
import styles from './modal.module.scss';
import { ModalTypes } from './modal.types';

type ModalProps = {
  type: ModalTypes;
  children: React.ReactNode;
  width?: string;
};

const Modal = ({ type, children, width }: ModalProps) => {
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal(type);
  };

  return (
    <ModalContext.Provider value={{ type, handleCloseModal }}>
      <div className={styles.overlay} onClick={handleCloseModal}>
        <div
          className={styles.modal}
          style={{ width }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.titleContainer}>
      <Typography fontSize="32px" fontWeight="bold">
        {children}
      </Typography>
    </div>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.content}>{children}</div>;
};

const Footer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.footer}>{children}</div>;
};

Modal.Title = Title;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
