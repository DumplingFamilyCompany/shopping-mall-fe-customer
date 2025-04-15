import Typography from '@/shared/ui/typography/Typography';
import styles from './Card.module.scss';

type ProductOverviewCardProps = {
  showImage?: boolean;
  cta?: { label: string; onClick: () => void };
};

const ProductOverviewCard = ({ showImage, cta }: ProductOverviewCardProps) => {
  return (
    <div className={styles.productOverviewCard}>
      <div className={styles.productOverviewCardInner}>
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
        {showImage && (
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
        )}
        <Typography>
          As companions responsible for elevating the quality of your life we
          assure you a sense of satisfaction incomparable to other brands
          products. Alongside Aeroway ceiling fan, experience a more plush and
          beautiful space.
        </Typography>
      </div>
      {cta?.label && (
        <button className={styles.productOverviewButton} onClick={cta.onClick}>
          {cta.label}
        </button>
      )}
    </div>
  );
};

export default ProductOverviewCard;
