import { ErrorModalProps } from './errorModal/ErrorModal';
import { PreReservationModalProps } from './preReservationModal/PreReservationModal';

export type ModalPropsMap = {
  ConfirmModal: {
    question: string;
    onCancel?: () => void;
    onConfirm?: () => void;
  };
  AlertModal: {
    hello: number;
  };
  ChangePasswordModal: object;
  ErrorModal: ErrorModalProps;
  PreReservationModal: PreReservationModalProps;
};

export type ModalConfig<T extends ModalTypes = ModalTypes> = {
  modalType: T;
  modalProps: ModalPropsMap[T];
};

export type ModalTypes = keyof ModalPropsMap;
