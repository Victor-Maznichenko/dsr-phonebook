import type { ComponentProps } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/widgets';
import { Button, InputText, Typography } from '@/shared/ui';
import { model } from '../../model';
import { schema } from './lib';
import styles from './styles.module.scss';

export const ModalCredentials = ({ ...props }: ComponentProps<typeof Modal>) => {
  const [submited] = useUnit([model.submited.credentials]);

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <Modal {...props}>
      <Typography className={styles.title} variant='heading_3'>Учетные данные:</Typography>
      <form className={styles.form} onSubmit={handleSubmit(submited)}>
        <InputText
          {...register('oldPassword', { required: true })}
          errorMessage={errors.oldPassword?.message}
          placeholder='Введите старый пароль'
          autoComplete='current-password'
          label='Старый пароль'
          type='password'
        />
        <InputText
          {...register('newPassword', { required: true })}
          errorMessage={errors.newPassword?.message}
          placeholder='Введите новый пароль'
          autoComplete='new-password'
          label='Новый пароль'
          type='password'
        />
        <Button className={styles.button} variant='filled-orange-md' disabled={!isDirty} type='submit'>
          Изменить
        </Button>
      </form>
    </Modal>
  );
};
