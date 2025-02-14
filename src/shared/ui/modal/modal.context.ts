import { createContext, useContext } from 'react';
import { ModalTypes } from './modal.types';

export const ModalContext = createContext<{
  type?: ModalTypes;
  handleCloseModal: () => void;
}>({
  type: undefined,
  handleCloseModal: () => {},
});

export const useModalContext = () => {
  return useContext(ModalContext);
};
