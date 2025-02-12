import { MultiSelectSearchModalProps } from './searchModal/OwnersSearchModal/OwnersSearchModal';
import { SingleSelectSearchModalProps } from './searchModal/TradeTypeSearchModal/TradeTypeSearchModal';

export type ModalPropsMap = {
  ConfirmModal: {
    question: string;
    onCancel?: () => void;
    onConfirm?: () => void;
  };
  AlertModal: {
    hello: number;
  };
  TradeTypeSearchModal: SingleSelectSearchModalProps;
  RegionSearchModal: SingleSelectSearchModalProps;
  OwnersSearchModal: MultiSelectSearchModalProps;
  DevicesSearchModal: MultiSelectSearchModalProps;
  ChangePasswordModal: object;
};

export type ModalConfig<T extends ModalTypes = ModalTypes> = {
  modalType: T;
  modalProps: ModalPropsMap[T];
};

export type ModalTypes = keyof ModalPropsMap;
