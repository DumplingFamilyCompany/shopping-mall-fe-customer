'use client';

import VisitServiceCard from '@/entities/customerService/ui/VisitServiceCard';
import { Card } from '@/entities/product/ui/card';
import DividerLayout from '@/shared/ui/dividerLayout/DividerLayout';
import Typography from '@/shared/ui/typography/Typography';
import styles from './HomeContainer.module.scss';

const HomeContainer = () => {
  return (
    <main className={styles.main}>
      <div className={styles.nav} />
      <section className={styles.section}>
        <Card.MainCard
          paddingTop="clamp(10.9rem, calc(9.104rem + 4.79vw), 18.3rem)"
          paddingBottom="clamp(12.1rem, calc(9.43rem + 7.12vw), 23.1rem)"
          children={
            <Typography
              maxWidth="clamp(33.5rem, calc(4.01rem + 78.641vw), 155rem)"
              fontSize="clamp(1.6rem, calc(0.629rem + 2.589vw), 5.6rem)"
              marginTop="max(1.8rem, calc(4.2rem - 0.155vw))"
              marginLeft="auto"
              marginRight="auto"
            >
              As companions responsible for elevating the quality of your life
              we assure you a sense of satisfaction incomparable to other brands
              products. Alongside Aeroway ceiling fan, experience a more plush
              and beautiful space.
            </Typography>
          }
        />
      </section>
      <section className={styles.section}>
        <DividerLayout>
          <Card.ImageCard />
          <Card.LogoCard variant="yellow" />
        </DividerLayout>
      </section>
      <section className={styles.section}>
        <DividerLayout>
          <Card.ProductOverviewCard
            cta={{ label: '사전예약하기', onClick: () => alert('사전예약') }}
          />
          <Card.ProductOverviewCard
            cta={{ label: '사전예약하기', onClick: () => alert('사전예약') }}
          />
        </DividerLayout>
      </section>
      <section className={styles.section}>
        <DividerLayout>
          <Card.TextCard>
            As companions responsible for elevating the quality of your life we
            assure you a sense of satisfaction incomparable to other brands
            products. Alongside Aeroway ceiling fan experience a more plush and
            beautiful space.
          </Card.TextCard>
          <Card.LogoCard />
        </DividerLayout>
      </section>
      <section className={styles.section}>
        <VisitServiceCard />
      </section>
    </main>
  );
};

export default HomeContainer;
