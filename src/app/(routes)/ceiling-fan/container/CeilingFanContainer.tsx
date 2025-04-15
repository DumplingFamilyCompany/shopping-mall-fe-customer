'use client';

import VisitServiceCard from '@/entities/customerService/ui/VisitServiceCard';
import { Card } from '@/entities/product/ui/card';
import MainCard from '@/entities/product/ui/card/MainCard';
import useModal from '@/shared/hooks/useModal';
import Button from '@/shared/ui/button/Button';
import DividerLayout from '@/shared/ui/dividerLayout/DividerLayout';
import styles from './CeilingFanContainer.module.scss';

const CeilingFanContainer = () => {
  const { openModal } = useModal();

  const handleReservationButton = () => {
    openModal({ modalType: 'PreReservationModal', modalProps: {} });
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav} />
      <Button
        height="clamp(9.6rem, calc(6.736rem + 7.638vw), 21.4rem)"
        borderTop
        borderBottom
        onClick={handleReservationButton}
      >
        사전예약신청하기
      </Button>
      <section className={styles.section}>
        <MainCard
          paddingTop="clamp(9.6rem, calc(9.382rem + 0.583vw), 10.5rem)"
          paddingBottom="clamp(9.6rem, calc(9.357rem + 0.647vw), 10.6rem)"
        />
      </section>
      <section className={styles.section}>
        <DividerLayout>
          <DividerLayout isVerticalOnMobile={false}>
            <Card.ProductStoreCard
              cta={{
                label: '자세히보기',
                onClick: () => alert('자세히보기 '),
              }}
            />
            <Card.ProductStoreCard
              cta={{
                label: '준비중',
                onClick: () => alert('준비중'),
                disabled: true,
              }}
            />
          </DividerLayout>
          <Card.ImageCard />
        </DividerLayout>
      </section>
      <section className={styles.section}>
        <Card.TextCard>
          As companions responsible for elevating the quality of your life we
          assure you a sense of satisfaction incomparable to other brands
          products. Alongside Aeroway ceiling fan, experience a more plush and
          beautiful space.
        </Card.TextCard>
      </section>
      <section className={styles.section}>
        <VisitServiceCard />
      </section>
    </div>
  );
};

export default CeilingFanContainer;
