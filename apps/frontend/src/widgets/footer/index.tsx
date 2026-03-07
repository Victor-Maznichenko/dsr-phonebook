import { Typography } from '@/shared/ui';
import styles from './styles.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <Typography variant='text_S' as='span'>Develop by </Typography>
    <Typography className={styles.link} variant='text_S' as='a'>Victor Maznichenko</Typography>
  </footer>
);
