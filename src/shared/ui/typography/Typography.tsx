import { JSX } from 'react';

type TypographyProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  fontWeight?: 'normal' | 'bold' | number;
  fontFamily?: 'Arial' | 'Pretendard' | 'Futura' | 'Nimbus';
  fontSize?: string;
  color?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  maxWidth?: string;
  letterSpacing?: string;
  className?: string;
};

const Typography = ({
  children,
  as: Component = 'p',
  fontWeight = 'normal',
  fontFamily = 'Arial',
  fontSize = '1.6rem',
  color,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  maxWidth,
  letterSpacing,
  className,
}: TypographyProps) => {
  return (
    <Component
      className={className}
      style={{
        fontWeight,
        fontSize,
        fontFamily,
        color,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        maxWidth,
        letterSpacing,
      }}
    >
      {children}
    </Component>
  );
};

export default Typography;
