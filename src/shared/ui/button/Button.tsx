import { memo } from 'react';
import Icon from '../icon/Icon';
import { IconNames } from '../icon/iconExports';
import styles from './button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  width?: string;
  height?: string;
  iconName?: IconNames;
  disabled?: boolean;
  fontSize?: string;
  variant?: 'filled' | 'border';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const Button = memo(
  ({
    children,
    width = '164px',
    height = '52px',
    iconName,
    disabled,
    fontSize = '20px',
    variant = 'filled',
    onClick,
  }: ButtonProps) => {
    return (
      <button
        className={`${styles.filled} ${iconName ? styles.withIcon : ''} ${disabled ? styles.disabled : ''} ${styles[variant]}`}
        style={{ width, height, fontSize }}
        onClick={onClick}
      >
        {iconName && (
          <Icon
            fill={variant === 'filled' ? '#ffffff' : '#334155'}
            name={iconName}
          />
        )}
        {children}
      </button>
    );
  },
);

export default Button;
