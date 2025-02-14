'use client';

import useModal from '@/shared/hooks/useModal';
import Icon from '../icon/Icon';
import { ModalContext, useModalContext } from './modal.context';
import styles from './modal.module.css';
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
  const { handleCloseModal } = useModalContext();

  return (
    <div className={styles.titleContainer}>
      <h6 className={styles.title}>{children}</h6>
      <button onClick={handleCloseModal}>
        <Icon name="close" width="24px" height="24px" />
      </button>
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
