import { createContext, useContext } from 'react';

export type SelectedValue = { label: string; value: string };

export const SelectContext = createContext<{
  selectedValue?: SelectedValue;
  isOpened: boolean;
  onChange: (selected: SelectedValue) => void;
  handleTrigger: () => void;
}>({
  selectedValue: undefined,
  isOpened: false,
  onChange: () => {},
  handleTrigger: () => {},
});

export const useSelectContext = () => {
  return useContext(SelectContext);
};
