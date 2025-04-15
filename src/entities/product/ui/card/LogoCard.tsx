import Typography from '@/shared/ui/typography/Typography';
import styles from './Card.module.scss';

const LogoCard = ({ variant = 'gray' }: { variant?: 'yellow' | 'gray' }) => {
  return (
    <div
      className={`${styles.logoCard} ${variant === 'yellow' ? styles.logoCardYellow : ''}`}
    >
      <Typography>Logo...</Typography>
      <div className={styles.logoCardCenterBorder} />
    </div>
  );
};

export default LogoCard;
