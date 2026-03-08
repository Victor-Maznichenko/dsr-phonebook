import type { ComponentProps } from 'react';
import { Link } from 'atomic-router-react';
import clsx from 'clsx';
import { routes } from '@/shared/config';
import { Avatar, Button, Typography } from '@/shared/ui';
import styles from './styles.module.scss';

interface UserCardProps extends Omit<ComponentProps<'div'>, 'id'>, UserCompactDto {}

export const UserCard = ({ className, id, avatar, firstName, lastName, grade, department }: UserCardProps) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <article className={clsx(className, styles.card)}>
      <Avatar className={styles.avatar} text={fullName} src={avatar} size={100} />
      <div>
        <Typography variant='heading_4' as='h4'>{fullName}</Typography>
        <Typography variant='text_S'>{grade}, {department}</Typography>
      </div>
      <Button params={{ userId: String(id) }} variant='light-orange-md' to={routes.user as any} as={Link}>Посмотреть</Button>
    </article>
  );
};
