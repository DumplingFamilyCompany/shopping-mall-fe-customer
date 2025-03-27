import CardGroup from '../ui/CardGroup';
import MainCard from '../ui/MainCard';
import VisitServiceCard from '../ui/VisitServiceCard';
import styles from './HomeContainer.module.scss';

const HomeContainer = () => {
  return (
    <main className={styles.main}>
      <div className={styles.nav} />
      <section className={styles.section}>
        <MainCard />
      </section>
      <section className={styles.section}>
        <CardGroup>
          <CardGroup.ImageCard />
          <CardGroup.LogoCard variant="yellow" />
        </CardGroup>
      </section>
      <section className={styles.section}>
        <CardGroup>
          <CardGroup.ReservationCard />
          <CardGroup.ReservationCard />
        </CardGroup>
      </section>
      <section className={styles.section}>
        <CardGroup>
          <CardGroup.TextCard />
          <CardGroup.LogoCard />
        </CardGroup>
      </section>
      <section className={styles.section}>
        <VisitServiceCard />
      </section>
    </main>
  );
};

export default HomeContainer;
