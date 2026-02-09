import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface SpinnerProps extends ComponentProps<'div'> {
  color?: string,
  size?: number,
}

export const Spinner = ({ className, color, size, ...props }: SpinnerProps) => {
  return (
    <div
      className={clsx(styles.spinner, className)}
      style={{
        '--spinner-color': color,
        '--spinner-size': size
      } as React.CSSProperties}
      {...props}
    />
  );
};
