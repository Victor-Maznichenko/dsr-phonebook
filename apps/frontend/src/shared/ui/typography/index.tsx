import type { TypographyProps } from './types';
import type { ElementType } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

export const Typography = <E extends ElementType = 'p'>({
  as,
  glitch,
  children,
  className,
  variant = 'text_S',
  ...props
}: TypographyProps<E>) => {
  const Component = as ?? 'p';

  return (
    <Component className={clsx(styles[variant], className)} {...props}>
      {children}
    </Component>
  );
};
