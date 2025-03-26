import Typography from '@/shared/ui/typography/Typography';
import styles from './card.module.scss';

const CardGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.cardGroup}>{children}</div>;
};

const TextCard = () => {
  return (
    <div className={styles.textCard}>
      <div className={styles.textCardInner}>
        <Typography fontSize="clamp(2.4rem, calc(1.429rem + 2.589vw), 6.4rem)">
          As companions responsible for elevating the quality of your life we
          assure you a sense of satisfaction incomparable to other brands
          products. Alongside Aeroway ceiling fan experience a more plush and
          beautiful space.
        </Typography>
      </div>
    </div>
  );
};

const ImageCard = () => {
  return <div className={styles.imageCard}>image....</div>;
};

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

const ReservationCard = () => {
  return (
    <div className={styles.reservationCard}>
      <div className={styles.reservationCardInner}>
        <Typography
          fontFamily="Futura"
          fontSize="clamp(5.8rem, calc(5.023rem + 2.071vw), 9rem)"
        >
          Sylph
        </Typography>
        <Typography
          fontFamily="Pretendard"
          fontSize="clamp(1.6rem, calc(1.551rem + 0.129vw), 1.8rem)"
          marginTop="clamp(1.7rem, calc(0.802rem + 2.395vw), 5.4rem)"
          marginBottom="clamp(3.1rem, calc(2.542rem + 1.489vw), 5.4rem)"
        >
          While we enhance the comforts and beauty of the customer’s daily life,
          we complement these values with reliable quality and service support.
        </Typography>
        <div
          style={{
            backgroundColor: 'aqua',
            width: '100%',
            aspectRatio: '1 / 1',
            margin: '0 auto',
          }}
        >
          실링팬 이미지
        </div>
        <Typography>
          As companions responsible for elevating the quality of your life we
          assure you a sense of satisfaction incomparable to other brands
          products. Alongside Aeroway ceiling fan, experience a more plush and
          beautiful space.
        </Typography>
      </div>
      <button className={styles.reservationButton}>사전예약하기</button>
    </div>
  );
};

CardGroup.TextCard = TextCard;
CardGroup.LogoCard = LogoCard;
CardGroup.ImageCard = ImageCard;
CardGroup.ReservationCard = ReservationCard;

export default CardGroup;
