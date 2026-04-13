import { useUnit } from 'effector-react';
import { controls, routes } from '@/shared/config';
import { Button } from '@/shared/ui';
import styles from './styles.module.scss';

export const NotFoundPage = () => {
  const [goHome, goBack] = useUnit([routes.home.open, controls.back]);

  return (
    <div className={styles.notFound}>
      <img className={styles.img} alt='Страница не найдена =(' src='images/not-found.svg' />
      <div>
        <Button className={styles.button} variant='light-green-md' onClick={goHome}>
          На главную
        </Button>
        <Button className={styles.button} variant='light-orange-md' onClick={goBack}>
          Вернуться назад
        </Button>
      </div>
    </div>
  );
};
