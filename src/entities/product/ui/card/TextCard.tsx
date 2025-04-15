import Typography from '@/shared/ui/typography/Typography';
import styles from './Card.module.scss';

type TextCardProps = {
  children: React.ReactNode;
};

const TextCard = ({ children }: TextCardProps) => {
  return (
    <div className={styles.textCard}>
      <div className={styles.textCardInner}>
        <Typography fontSize="clamp(2.4rem, calc(1.429rem + 2.589vw), 6.4rem)">
          {children}
        </Typography>
      </div>
    </div>
  );
};

export default TextCard;
