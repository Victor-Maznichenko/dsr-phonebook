import { Spinner } from '@/shared/ui';
import styles from './styles.module.scss';

export const PageSpinner = () => (
  <div className={styles.wrapper}>
    <Spinner />
  </div>
);
