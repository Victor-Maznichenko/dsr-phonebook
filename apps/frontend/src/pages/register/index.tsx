import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'atomic-router-react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { Controller, useForm } from 'react-hook-form';
import { routes } from '@/shared/config';
import { departmentItems, gradeItems } from '@/shared/lib';
import { Button, InputText, Select, Textarea, Typography } from '@/shared/ui';
import { schema } from './lib';
import { model } from './model';
import styles from './styles.module.scss';

export const RegisterPage = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const [isLoading, errorMessage, submited] = useUnit([model.$isLoading, model.$errorMessage, model.submited]);
  const { control, register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className={clsx(styles.root, isAdmin && styles.admin)}>
      <div className={styles.inner}>
        <form className={styles.form} onSubmit={handleSubmit(submited)}>
          <div>
            <Typography className={styles.title} variant='heading_2'>
              Добро пожаловать!
            </Typography>
            <Typography className={styles.description} variant='text_M'>
              Расскажите немного о себе, чтобы коллеги лучше вас узнали
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
            placeholder='Придумайте пароль'
            autoComplete='new-password'
            type='password'
          />
          <InputText
            {...register('firstName', { required: true })}
            errorMessage={errors.firstName?.message}
            placeholder='Имя'
          />
          <InputText
            {...register('lastName', { required: true })}
            errorMessage={errors.lastName?.message}
            placeholder='Фамилия'
          />
          <InputText
            {...register('workPhone', { required: true })}
            errorMessage={errors.workPhone?.message}
            placeholder='Рабочий телефон'
          />
          <Controller
            render={({ field }) => (
              <Select
                {...field}
                errorMessage={errors.department?.message}
                items={departmentItems}
                placeholder='Отдел'
              />
            )}
            name='department'
            control={control}
          />
          <Controller
            render={({ field }) => (
              <Select
                {...field}
                errorMessage={errors.grade?.message}
                placeholder='Грейд'
                items={gradeItems}
              />
            )}
            control={control}
            name='grade'
          />
          <Textarea
            {...register('about', { required: true })}
            errorMessage={errors.about?.message}
            placeholder='Расскажите о себе...'
          />
          <Button
            className={styles.button}
            disabled={Boolean(errorMessage)}
            variant='filled-orange-md'
            loading={isLoading}
            type='submit'
          >
            Войти
          </Button>
          <div className={styles.bottom}>
            <Typography className={styles.error} variant='label_S'>
              {errorMessage && errorMessage}
            </Typography>
            <Typography to={routes.login} variant='link' as={Link}>Уже есть аккаунт?</Typography>
          </div>
        </form>
      </div>
    </div>
  );
};
