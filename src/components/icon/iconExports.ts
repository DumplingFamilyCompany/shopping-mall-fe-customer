import AddIcon from 'public/icons/ico_add.svg';

export type IconNames = keyof typeof ICONS;

export const ICONS = {
  add: AddIcon,
} as const;
