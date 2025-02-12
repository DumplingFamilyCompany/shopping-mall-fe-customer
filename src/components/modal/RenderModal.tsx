import ChangePasswordModal from './changePasswordModal/ChangePasswordModal';
import ConfirmModal from './confirmModal/ConfirmModal';
import { ModalConfig, ModalPropsMap, ModalTypes } from './modal.types';
import DevicesSearchModal from './searchModal/DevicesSearchModal/DevicesSearchModal';
import OwnersSearchModal from './searchModal/OwnersSearchModal/OwnersSearchModal';
import RegionSearchModal from './searchModal/RegionSearchModal/RegionSearchModal';
import TradeTypeSearchModal from './searchModal/TradeTypeSearchModal/TradeTypeSearchModal';

const MODAL_COMPONENTS: {
  [K in ModalTypes]: React.FC<ModalPropsMap[K]>;
} = {
  ConfirmModal: ConfirmModal,
  AlertModal: () => <div>AlertModal</div>,
  TradeTypeSearchModal: TradeTypeSearchModal,
  RegionSearchModal: RegionSearchModal,
  OwnersSearchModal: OwnersSearchModal,
  DevicesSearchModal: DevicesSearchModal,
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
