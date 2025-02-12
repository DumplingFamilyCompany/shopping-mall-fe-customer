import styles from './statusIndicator.module.scss';

const StatusIndicator = ({
  variant,
  children,
}: {
  variant: 'primary2' | 'primary3' | 'neutral2';
  children: React.ReactNode;
}) => {
  return <div className={styles[variant]}>{children}</div>;
};

export default StatusIndicator;
