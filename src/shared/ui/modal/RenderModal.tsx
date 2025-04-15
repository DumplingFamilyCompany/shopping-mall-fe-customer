import ChangePasswordModal from './changePasswordModal/ChangePasswordModal';
import ConfirmModal from './confirmModal/ConfirmModal';
import ErrorModal from './errorModal/ErrorModal';
import { ModalConfig, ModalPropsMap, ModalTypes } from './modal.types';
import PreReservationModal from './preReservationModal/PreReservationModal';

const MODAL_COMPONENTS: {
  [K in ModalTypes]: React.FC<ModalPropsMap[K]>;
} = {
  ConfirmModal: ConfirmModal,
  AlertModal: () => <div>AlertModal</div>,
  ChangePasswordModal: ChangePasswordModal,
  ErrorModal: ErrorModal,
  PreReservationModal: PreReservationModal,
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
