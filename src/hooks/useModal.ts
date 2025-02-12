import { useAtom } from 'jotai';
import { modalAtom } from '@/atoms/modal/modal';
import { ModalConfig, ModalTypes } from '@/components/modal/modal.types';

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
