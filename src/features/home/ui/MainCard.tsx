import Typography from '@/shared/ui/typography/Typography';
import styles from './card.module.scss';

const MainCard = () => {
  return (
    <div className={styles.mainCard}>
      <Typography
        fontFamily="Futura"
        fontSize="clamp(5.8rem, calc(4.392rem + 3.754vw), 11.6rem);"
        marginBottom="clamp(1.7rem, calc(1.069rem + 1.683vw), 4.3rem);"
      >
        elley
      </Typography>
      <Typography
        fontFamily="Pretendard"
        fontSize="clamp(1.6rem, calc(1.551rem + 0.129vw), 1.8rem);"
        maxWidth="clamp(32.6rem, calc(21.532rem + 29.515vw), 78.2rem);"
        margin="0 auto 0"
        marginBottom="max(1.8rem, calc(3.1rem - 0.9vw));"
        letterSpacing="-0.058rem"
      >
        While we enhance the comforts and <br />
        beauty of the customer’s daily life, we complement these values with
        reliable quality and service support.
      </Typography>
      <div
        style={{
          backgroundColor: 'aqua',
          width: 'clamp(33.5rem, calc(17.408rem + 42.913vw), 99.8rem)',
          aspectRatio: '1 / 1',
          margin: '0 auto',
        }}
      >
        실링팬 이미지
      </div>
      <Typography
        fontSize="clamp(1.6rem, calc(0.629rem + 2.589vw), 5.6rem);"
        marginTop="max(1.8rem, calc(4.2rem - 0.155vw))"
      >
        As companions responsible for elevating the quality of your life we
        assure you a sense of satisfaction incomparable to other brands
        products. Alongside Aeroway ceiling fan, experience a more plush and
        beautiful space.
      </Typography>
    </div>
  );
};

export default MainCard;
