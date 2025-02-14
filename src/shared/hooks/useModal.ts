import { useAtom } from 'jotai';
import { modalAtom } from '@/shared/atoms/modal/modal';
import { ModalConfig, ModalTypes } from '@/shared/ui/modal/modal.types';

const useModal = () => {
  const [modalList, setModalList] = useAtom(modalAtom);

  const openModal = (props: ModalConfig) => {
    setModalList([...modalList, props]);
  };

  const closeModal = (modalType: ModalTypes) => {
    const filteredModal = modalList.filter(
      (modal) => modal.modalType !== modalType,
    );
    setModalList(filteredModal);
  };

  return { openModal, closeModal };
};

export default useModal;
