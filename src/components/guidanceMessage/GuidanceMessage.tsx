import styles from './guidanceMessage.module.scss';

const GuidanceMessage = ({ children }: { children: React.ReactNode }) => {
  return <p className={styles.message}>{children}</p>;
};

export default GuidanceMessage;
