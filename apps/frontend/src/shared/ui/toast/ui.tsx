import type { ToastType } from './lib';
import clsx from 'clsx';
import { useSyncExternalStore } from 'react';
import { Button, Icons, Typography } from '@/shared/ui';
import { toast } from './lib';
import styles from './styles.module.scss';

export const Toast = ({ id, title, message, variant }: ToastType) => (
  <div className={clsx(styles.toast, styles[`variant-${variant}`])}>
    <Typography className={styles.toastTitle} variant='heading_5' as='h5'>{title}</Typography>
    <Typography className={styles.toastMessage} variant='text_S'>{message}</Typography>

    <Button className={styles.toastClose} onClick={() => toast.close(id)} variant='unstyled'>
      <Icons.Cross />
    </Button>
  </div>
);

export const Toaster = () => {
  const toasts = useSyncExternalStore(
    toast.subscribe,
    toast.getSnapshot,
    toast.getSnapshot
  );

  return (
    <div className={styles.toaster}>
      {toasts.map((toast) => <Toast {...toast} key={toast.id} />)}
    </div>
  );
};
