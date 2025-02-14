import IcoAdd from '../../../../public/icons/ico_add.svg';
import IcoArrowBack from '../../../../public/icons/ico_arrow_back.svg';
import IcoClose from '../../../../public/icons/ico_close.svg';

export type IconNames = keyof typeof ICONS;

export const ICONS = {
  add: IcoAdd,
  arrowBack: IcoArrowBack,
  close: IcoClose,
} as const;
