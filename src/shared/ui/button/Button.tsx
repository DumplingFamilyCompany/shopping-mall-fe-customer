import { memo } from 'react';
import styles from './button.module.scss';

export type ButtonProps = {
  children: React.ReactNode;
  width?: string;
  height?: string;
  // iconName?: IconNames;
  disabled?: boolean;
  fontSize?: string;
  variant?: 'yellow' | 'gray' | 'border';
  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  borderColor?: string;
  textColor?: string;
  borderRadius?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const Button = memo(
  ({
    children,
    width = '100%',
    height = '52px',
    // iconName,
    disabled = false,
    fontSize = '20px',
    variant = 'yellow',
    borderTop,
    borderBottom,
    borderLeft,
    borderRight,
    borderColor = '#000000',
    textColor,
    borderRadius,
    onClick,
  }: ButtonProps) => {
    const borderStyle = `1px solid ${borderColor}`;

    const style: React.CSSProperties = {
      width,
      height,
      fontSize,
      ...(textColor && { color: textColor }),
      ...(borderRadius && { borderRadius }),
      ...(borderTop && { borderTop: borderStyle }),
      ...(borderBottom && { borderBottom: borderStyle }),
      ...(borderLeft && { borderLeft: borderStyle }),
      ...(borderRight && { borderRight: borderStyle }),
    };

    return (
      <button
        className={`${styles.button} ${styles[variant]}`}
        style={style}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);

export default Button;
