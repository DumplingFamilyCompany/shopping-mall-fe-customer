import { createContext, useContext } from 'react';

export type SelectedValue = { label: string; value: string };

export const SelectContext = createContext<{
  width?: string;
  selectedValue?: SelectedValue;
  isOpened: boolean;
  onChange: (selected: SelectedValue) => void;
  handleTrigger: () => void;
}>({
  isOpened: false,
  onChange: () => {},
  handleTrigger: () => {},
});

export const useSelectContext = () => {
  return useContext(SelectContext);
};
