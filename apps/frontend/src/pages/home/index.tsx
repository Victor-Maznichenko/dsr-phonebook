import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { UserCard } from '@/widgets';
import { Typography } from '@/shared/ui';
import { model } from './model';
import styles from './styles.module.scss';

export const HomePage = () => {
  const [users] = useUnit([model.$users]);

  return (
    <div className={clsx('container', styles.inner)}>
      <Typography className={styles.title} variant='heading_2' as='h2'>Пользователи:</Typography>
      <div className={styles.list}>
        {users.map((user) => <UserCard className={styles.card} key={user.id} {...user} />)}
      </div>
    </div>
  );
};
