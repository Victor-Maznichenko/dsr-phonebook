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

export const LoginPage = () => {
  const [isLoading, isIncorrectData, isAdminRouteOpened, submited] = useUnit([
    model.$isLoading,
    model.$isIncorrectData,
    model.$isAdminRouteOpened,
    model.submited
  ]);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className={clsx(styles.root, isAdminRouteOpened && styles.admin)}>
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
            type='password'
          />
          <Button
            className={styles.button}
            variant={isAdminRouteOpened ? 'filled-red-md' : 'filled-orange-md'}
            disabled={isIncorrectData}
            loading={isLoading}
            type='submit'
          >
            Войти
          </Button>
          <div className={styles.bottom}>
            <Typography className={styles.error} variant='label_S'>
              {isIncorrectData && 'Некорректный email или пароль'}
            </Typography>
            { !isAdminRouteOpened && <Typography to={routes.register} variant='link' as={Link}>Зарегистрироваться</Typography> }
          </div>
        </form>
      </div>
    </div>
  );
};
