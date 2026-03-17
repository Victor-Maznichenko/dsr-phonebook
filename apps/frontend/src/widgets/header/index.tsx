import { Link } from 'atomic-router-react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { routes } from '@/shared/config';
import { selfModel } from '@/shared/session';
import { ThemeSwitcher } from '@/features';
import { Avatar, Button, Icons, Menu } from '@/shared/ui';
import { model } from './model';
import styles from './styles.module.scss';

export const Header = () => {
  const [isAdmin, logout] = useUnit([selfModel.$isAdmin, model.logout]);

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
              <Menu.Item to={routes.profile} as={Link}>Профиль</Menu.Item>
              <Menu.Item variant='text-sm' onClick={logout} as={Button}>Выйти из аккаунта</Menu.Item>
            </Menu.Popup>
          </Menu.Root>
        </div>
      </div>
    </header>
  );
};
