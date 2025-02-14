import ChangePasswordModal from './changePasswordModal/ChangePasswordModal';
import ConfirmModal from './confirmModal/ConfirmModal';
import { ModalConfig, ModalPropsMap, ModalTypes } from './modal.types';

const MODAL_COMPONENTS: {
  [K in ModalTypes]: React.FC<ModalPropsMap[K]>;
} = {
  ConfirmModal: ConfirmModal,
  AlertModal: () => <div>AlertModal</div>,
  ChangePasswordModal: ChangePasswordModal,
};

const RenderModal = <T extends ModalTypes>({
  modalType,
  modalProps,
}: ModalConfig<T>) => {
  const ModalComponent = MODAL_COMPONENTS[modalType] as React.FC<
    ModalPropsMap[T]
  >;
  return <ModalComponent {...modalProps} />;
};

export default RenderModal;
