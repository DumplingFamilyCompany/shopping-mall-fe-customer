import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, NavItemsType } from '@/shared/config/routes';
import Icon from '../icon/Icon';
import styles from './nav.module.css';
import SubNavItem from './SubNavItem';

const Nav = ({ children }: { children: React.ReactNode }) => {
  return <nav>{children}</nav>;
};

const BasicInfo = () => {
  const pathname = usePathname();

  return (
    <>
      <div className={styles.logoContainer}>
        <p className={styles.logo}>
          <Icon name="add" width="24px" height="24px" />
        </p>
        애니이츠
      </div>
      <NavItem
        nav={NAV_ITEMS['내 정보']}
        isActive={pathname === NAV_ITEMS['내 정보'].path}
        pathname={pathname}
      >
        <div className={styles.accountInfo}>하성삼님</div>
      </NavItem>
      <div className={styles.border} />
    </>
  );
};

const NavList = () => {
  const pathname = usePathname();

  return (
    <ul>
      {Object.values(NAV_ITEMS).map((nav) => {
        if (!nav.visible) return <Fragment key={nav.name} />;

        if (nav.name === '기기' && !nav.path) {
          return <li key="border" className={styles.border} />;
        }

        return (
          <NavItem
            key={nav.name}
            nav={nav}
            isActive={pathname === nav.path}
            pathname={pathname}
          />
        );
      })}
    </ul>
  );
};

const NavItem = ({
  nav,
  isActive,
  pathname,
  children,
}: {
  nav: NavItemsType;
  isActive: boolean;
  pathname: string;
  children?: React.ReactNode;
}) => {
  const hasChildren = !!Object.values(nav.children)?.length;
  const isSubNavOpened = nav.path !== '/' && pathname.startsWith(nav.path);
  const [isOpened, setIsOpened] = useState<boolean>(isSubNavOpened);

  useEffect(() => {
    setIsOpened(isSubNavOpened);
  }, [isSubNavOpened]);

  const isActivePath = useMemo(() => {
    return isActive || isSubNavOpened;
  }, [isActive, isSubNavOpened]);

  const handleToggle = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <li key={nav.name} className={styles.navItem}>
      {!hasChildren ? (
        <Link href={nav.path} className={isActivePath ? styles.active : ''}>
          {children || nav.name}
        </Link>
      ) : (
        <div>
          <span
            onClick={handleToggle}
            className={isActivePath ? styles.active : ''}
          >
            {nav.name}
          </span>
          {isOpened && (
            <SubNavItem
              nav={nav}
              pathname={pathname}
              handleToggle={handleToggle}
            />
          )}
        </div>
      )}
    </li>
  );
};

Nav.BasicInfo = BasicInfo;
Nav.NavList = NavList;

export default Nav;
