import { currencyConverter } from '@/shared/lib/currency';
import Button from '@/shared/ui/button/Button';
import Typography from '@/shared/ui/typography/Typography';
import styles from './ProductStoreCard.module.scss';

type ProductStoreCardProps = {
  cta: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
};

const ProductStoreCard = ({ cta }: ProductStoreCardProps) => {
  return (
    <div>
      <Typography className={styles.productName} fontFamily="Futura">
        Sylph
      </Typography>
      <div className={styles.productImage}>
        <div
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            backgroundColor: 'yellowgreen',
          }}
        >
          이미지 자리
        </div>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productDetailInfo}>
          실프
          <p className={styles.divider} />
          에어로웨이 실프 론칭
        </div>
        <Typography className={styles.productPriceTitle}>첫 구매가</Typography>
        <div className={styles.productPrice}>
          <Typography fontWeight="bold" color="#DEDEDE">
            40%
          </Typography>
          <Typography fontWeight="bold">
            {currencyConverter(218913)}원
          </Typography>
        </div>
      </div>
      <Button
        variant="yellow"
        height="clamp(4.8rem, calc(-0.01rem + 6.255vw), 12rem)"
        fontSize="clamp(0.96rem, calc(-0.002rem + 1.251vw), 2.4rem)"
        onClick={cta.onClick}
        disabled={cta.disabled}
        borderTop
      >
        {cta.label}
      </Button>
    </div>
  );
};

export default ProductStoreCard;
