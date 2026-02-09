import type { ComponentProps } from 'react';
import clsx from 'clsx';
import { Condition } from '../condition';
import { Icons } from '../icons';
import styles from './styles.module.scss';

interface AvatarProps extends ComponentProps<'img'> {
  variant?: 'circle' | 'square';
  text?: string;
}

export const Avatar = ({ src, variant = 'circle', text, ...props }: AvatarProps) => (
  <div className={clsx(styles.avatar, variant && styles[variant])}>
    <Condition
      else={
        <Condition else={<Icons.User className={styles.icon} />} value={text} then='TR' />
      }
      then={<img className={styles.img} src={src} {...props} />}
      value={src}
    />
  </div>
);
