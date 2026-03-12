import type { ComponentProps } from 'react';
import clsx from 'clsx';
import { Condition } from '../condition';
import { Icons } from '../icons';
import { getInitials } from './lib';
import styles from './styles.module.scss';

interface AvatarOwnProps {
  variant?: 'circle' | 'square';
  src?: Nullable<string>;
  text?: string;
  size?: number;
}

interface AvatarProps extends Omit<ComponentProps<'img'>, keyof AvatarOwnProps>, AvatarOwnProps {};

export const Avatar = ({ src, variant = 'circle', size = 32, text, ...props }: AvatarProps) => (
  <div
    className={clsx(styles.avatar, variant && styles[variant], !text && !src && styles.iconPlaceholder)}
    style={{ '--avatar-size': `${size}px`, ...props.style } as React.CSSProperties}
  >
    <Condition
      else={
        <Condition else={<Icons.User className={styles.icon} height='none' width='none' />} then={getInitials(text ?? '')} value={text} />
      }
      then={<img className={styles.img} src={src ?? undefined} {...props} />}
      value={src}
    />
  </div>
);
