import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

export const Spinner = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={clsx(styles.spinner, className)} {...props} />;
};
