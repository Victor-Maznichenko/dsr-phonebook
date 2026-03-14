import clsx from 'clsx';
import { useList, useUnit } from 'effector-react';
import { UserCard } from '@/widgets';
import { Skeletons, Typography } from '@/shared/ui';
import { model } from './model';
import styles from './styles.module.scss';

export const HomePage = () => {
  const [isLoading] = useUnit([model.$isLoading]);
  const usersList = useList(model.$users, (user) => <UserCard className={styles.card} key={user.id} {...user} />);

  return (
    <div className={clsx('container', styles.inner)}>
      <Typography className={styles.title} variant='heading_2' as='h2'>Пользователи:</Typography>
      <div className={styles.list}>
        {isLoading ? <Skeletons.UserList cardClassName={styles.card} /> : usersList}
      </div>
    </div>
  );
};
