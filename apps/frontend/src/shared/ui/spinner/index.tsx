import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface SpinnerProps extends ComponentProps<'div'> {
  size?: number,
  color?: string,
}

export const Spinner = ({ className, color, size = 32, ...props }: SpinnerProps) => {
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
