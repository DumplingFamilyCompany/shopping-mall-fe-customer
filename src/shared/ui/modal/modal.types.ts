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
};

export type ModalConfig<T extends ModalTypes = ModalTypes> = {
  modalType: T;
  modalProps: ModalPropsMap[T];
};

export type ModalTypes = keyof ModalPropsMap;
