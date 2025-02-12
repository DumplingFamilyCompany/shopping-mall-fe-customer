import styles from './flexBox.module.scss';

const FlexBox = ({
  children,
  gap = '12px',
  justifyContent,
}: {
  children: React.ReactNode;
  gap?: string;
  justifyContent?: string;
}) => {
  return (
    <div className={styles.container} style={{ gap, justifyContent }}>
      {children}
    </div>
  );
};

export default FlexBox;
