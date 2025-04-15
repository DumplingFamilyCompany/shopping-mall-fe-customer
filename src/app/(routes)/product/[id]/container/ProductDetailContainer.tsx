import { Card } from '@/entities/product/ui/card';
import DividerLayout from '@/shared/ui/dividerLayout/DividerLayout';
import Icon from '@/shared/ui/icon/Icon';
import styles from './ProductDetailContainer.module.scss';

const ProductDetailContainer = () => {
  return (
    <div>
      <div className={styles.productNameContainer}>
        <Icon name="elley" width="118px" height="60px" fill="#000000" />
      </div>
      <DividerLayout>
        <Card.ImageCard />
        <Card.ImageCard />
      </DividerLayout>
    </div>
  );
};

export default ProductDetailContainer;
