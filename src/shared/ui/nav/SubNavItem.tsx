import { useRef } from 'react';
import Link from 'next/link';
import { NavItemsType } from '@/shared/config/routes';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import styles from './nav.module.css';

const SubNavItem = ({
  nav,
  pathname,
  handleToggle,
}: {
  nav: NavItemsType;
  pathname: string;
  handleToggle: () => void;
}) => {
  const ref = useRef<HTMLUListElement>(null);
  useOutsideClick(ref, () => {
    handleToggle();
  });

  return (
    <ul className={styles.subNavList} ref={ref}>
      {Object.values(nav.children)?.map((subNav) => {
        const totalPath = `${nav.path}${subNav.path}`;
        const isSubNavActive = pathname.startsWith(totalPath);

        return (
          <li key={subNav.name} className={styles.subNavItem}>
            <Link
              href={totalPath}
              className={`${isSubNavActive ? styles.active : ''}`}
            >
              {subNav.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SubNavItem;
