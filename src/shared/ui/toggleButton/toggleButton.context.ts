import { createContext, useContext } from 'react';

export const ToggleContext = createContext<{
  value: string;
  onChange: (selected: string) => void;
}>({
  value: '',
  onChange: () => {},
});

export const useToggleContext = () => {
  return useContext(ToggleContext);
};
