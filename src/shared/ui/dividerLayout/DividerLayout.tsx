import styles from './DividerLayout.module.scss';

type DividerLayoutProps = {
  children: [React.ReactNode, React.ReactNode];
  isVerticalOnMobile?: boolean;
};

const DividerLayout = ({
  children,
  isVerticalOnMobile = true,
}: DividerLayoutProps) => {
  const [left, right] = children;

  return (
    <div
      className={`${styles.flexContainer} ${isVerticalOnMobile ? styles.verticalOnMobile : ''}`}
    >
      <div className={styles.left}>{left}</div>
      <div className={styles.divider} />
      <div className={styles.right}>{right}</div>
    </div>
  );
};

export default DividerLayout;
