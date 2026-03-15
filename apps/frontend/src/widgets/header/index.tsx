import { Link } from 'atomic-router-react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { routes } from '@/shared/config';
import { $isAdmin } from '@/shared/lib';
import { ThemeSwitcher } from '@/features';
import { Avatar, Button, Icons, Menu } from '@/shared/ui';
import { model } from './model';
import styles from './styles.module.scss';

export const Header = () => {
  const [isAdmin, logout] = useUnit([$isAdmin, model.logout]);
  return (
    <header className={styles.header}>
      <div className={clsx('container', styles.inner)}>
        <Link to={routes.home}>
          <Icons.Logo />
        </Link>
        <div className={styles.actions}>
          {
            isAdmin && <Button to={routes.accessRequests} variant='light-green-sm' as={Link}>Запросы доступа</Button>
          }
          <ThemeSwitcher />
          <Menu.Root>
            <Menu.Trigger>
              <Avatar />
            </Menu.Trigger>
            <Menu.Popup>
              <Menu.Item disabled>Ваша роль: {isAdmin ? 'Администратор' : 'Пользователь'}</Menu.Item>
              <Menu.Item><Link to={routes.profile}>Профиль</Link></Menu.Item>
              <Menu.Item><Button variant='text-sm' onClick={logout}>Выйти из аккаунта</Button></Menu.Item>
            </Menu.Popup>
          </Menu.Root>
        </div>
      </div>
    </header>
  );
};
