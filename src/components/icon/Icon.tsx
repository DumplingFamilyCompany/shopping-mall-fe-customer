import { CSSProperties } from 'react';
import { IconNames, ICONS } from './iconExports';

export type IconProps = {
  name: IconNames;
  fill?: string; // TODO: theme의 컬러타입으로 변경 EX) fill?: keyof ColorsType | string;
  width?: string;
  height?: string;
  style?: CSSProperties;
  className?: string;
};

const Icon = ({
  name,
  fill = 'white',
  width = '16px',
  height = '16px',
  style,
  className,
}: IconProps) => {
  const TargetIcon = ICONS[name];

  return (
    <TargetIcon
      fill={fill}
      width={width}
      height={height}
      style={style}
      className={className}
    />
  );
};

export default Icon;
