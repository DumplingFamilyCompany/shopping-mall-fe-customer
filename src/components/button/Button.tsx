import { memo } from 'react';
import Icon from '../icon/Icon';
import { IconNames } from '../icon/IconExports';
import styles from './button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  width?: string;
  height?: string;
  iconName?: IconNames;
  disabled?: boolean;
  fontSize?: string;
  variant?: 'button1' | 'primary1' | 'primary2';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const Filled = memo(
  ({
    children,
    width = '164px',
    height = '52px',
    iconName,
    disabled,
    fontSize = '20px',
    variant = 'button1',
    onClick,
  }: ButtonProps) => {
    return (
      <button
        className={`${styles.filled} ${iconName ? styles.withIcon : ''} ${disabled ? styles.disabled : ''} ${styles[variant]}`}
        style={{ width, height, fontSize }}
        onClick={onClick}
      >
        {iconName && <Icon fill="#ffffff" name={iconName} />}
        {children}
      </button>
    );
  },
);

const Border = memo(
  ({
    children,
    width = '164px',
    height = '52px',
    iconName,
    disabled,
    fontSize = '20px',
    onClick,
  }: ButtonProps) => {
    return (
      <button
        className={`${styles.border} ${iconName ? styles.withIcon : ''} ${disabled ? styles.disabled : ''}`}
        style={{ width, height, fontSize }}
        onClick={onClick}
      >
        {iconName && <Icon fill="#334155" name={iconName} />}
        {children}
      </button>
    );
  },
);

export const Button = { Border, Filled };
