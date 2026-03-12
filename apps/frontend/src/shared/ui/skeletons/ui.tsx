import type { ComponentProps } from 'react';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import styles from './styles.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export const UserCard = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={clsx(styles.userCard, className)} {...props}>
    <Skeleton
      className={styles.userCard__inner}
      highlightColor='var(--color-skeleton-highlight)'
      baseColor='var(--color-skeleton-base)'
      height='100%'
      width='100%'
    />
  </div>
);

export const UserList = ({ length = 6, cardClassName = '' }) => (
  <>
    {Array.from({ length }).map((_, index) => (
      <UserCard className={cardClassName} key={index} />
    ))}
  </>
);
