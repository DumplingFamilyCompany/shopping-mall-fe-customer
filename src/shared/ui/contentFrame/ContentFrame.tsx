import styles from './contentFrame.module.scss';

const BoxShadowContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

const RowContainer = ({
  children,
  minHeight = '60px',
}: {
  children: React.ReactNode;
  minHeight?: string;
}) => {
  return (
    <div className={styles.flexContainer} style={{ minHeight }}>
      {children}
    </div>
  );
};

const Label = ({
  children,
  width = '120px',
}: {
  children: React.ReactNode;
  width?: string;
}) => {
  return (
    <p className={styles.label} style={{ width }}>
      {children}
    </p>
  );
};

RowContainer.Label = Label;

export default { BoxShadowContainer, RowContainer };
