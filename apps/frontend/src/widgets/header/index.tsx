import { Link } from 'atomic-router-react';
import clsx from 'clsx';
import { routes } from '@/shared/config';
import { ThemeSwitcher } from '@/features';
import { Avatar, Icons } from '@/shared/ui';
import styles from './styles.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <div className={clsx('container', styles.inner)}>
      <Link to={routes.home}>
        <Icons.Logo />
      </Link>
      <div className={styles.actions}>
        <ThemeSwitcher />
        <Link to={routes.profile}><Avatar /></Link>
      </div>
    </div>
  </header>
);
