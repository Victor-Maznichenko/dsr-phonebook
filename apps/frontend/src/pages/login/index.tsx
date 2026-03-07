import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'atomic-router-react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { routes } from '@/shared/config';
import { schemas } from '@/shared/lib';
import { Button, InputText, Typography } from '@/shared/ui';
import { model } from './model';
import styles from './styles.module.scss';

const schema = z.object({
  email: schemas.email,
  password: schemas.password
});

export const LoginPage = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const accentColor = isAdmin ? 'red.6' : 'indigo.8';
  const [isLoading, isIncorrectData, submited] = useUnit([model.$isLoading, model.$isIncorrectData, model.submited]);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  return (
    <main className={clsx(styles.root, isAdmin && styles.admin)}>
      <div className={styles.inner}>
        <form className={styles.form} onSubmit={handleSubmit(submited)}>
          <div>
            <Typography className={styles.title} variant='heading_2'>
              Войдите в систему
            </Typography>
            <Typography className={styles.description} variant='text_M'>
              Добро пожаловать обратно, мы по вам скучали!
            </Typography>
          </div>
          <InputText
            {...register('email', { required: true })}
            errorMessage={errors.email?.message}
            placeholder='Введите почту'
            autoComplete='email'
          />
          <InputText
            {...register('password', { required: true })}
            errorMessage={errors.password?.message}
            autoComplete='current-password'
            placeholder='Введите пароль'
          />
          <Button
            className={styles.button}
            disabled={isIncorrectData}
            variant='filled-orange-md'
            loading={isLoading}
            color={accentColor}
            type='submit'
          >
            Войти
          </Button>
          <div className={styles.bottom}>
            <Typography className={styles.error} variant='label'>
              {isIncorrectData && 'Некорректный email или пароль'}
            </Typography>
            <Typography to={routes.register} variant='link' as={Link}>Зарегистрироваться</Typography>
          </div>
        </form>
      </div>
    </main>
  );
};
