import Link from 'next/link';
import { NAV_ITEMS } from '@/shared/config/routes';
import styles from './navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navLogo}>AEROWAY</div>
      <ul className={styles.navMenu}>
        {Object.values(NAV_ITEMS).map((nav) => (
          <li key={nav.name}>
            <Link href={nav.path}>{nav.name}</Link>
          </li>
        ))}
      </ul>
      <div className={styles.navLogin}>
        <Link href="/login">로그인</Link>
      </div>
    </nav>
  );
};

export default Navigation;
