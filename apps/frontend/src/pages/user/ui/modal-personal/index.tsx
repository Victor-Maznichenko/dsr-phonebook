import type { DepartmentValue, GradeValue } from '@/shared/lib';
import type { ComponentProps } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { departmentItems, gradeItems } from '@/shared/lib';
import { Button, InputText, Modal, Select, Textarea, Typography } from '@/shared/ui';
import { model } from '../../model';
import { schema } from './lib';
import styles from './styles.module.scss';

interface ModalPersonalProps extends ComponentProps<typeof Modal> {
  onChangeCredentials: () => void;
}

export const ModalPersonal = ({ onChangeCredentials, ...props }: ModalPersonalProps) => {
  const [user, submited, userDeleted] = useUnit([model.$user, model.submitted.personal, model.userDeleted]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      workPhone: '',
      department: '' as DepartmentValue,
      grade: '' as GradeValue,
      about: ''
    }
  });

  useEffect(() => {
    if (user) {
      const formData = {
        firstName: user.firstName,
        lastName: user.lastName,
        workPhone: user.workPhone,
        department: user.department as DepartmentValue,
        grade: user.grade as GradeValue,
        about: user.about
      };

      reset(formData);
    }
  }, [user, reset]);

  if (!user) {
    return null;
  }

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    const isAccept = confirm('Пользователь будет удален');

    if (isAccept) {
      userDeleted();
    }
  };

  return (
    <Modal className={styles.modal} {...props}>
      <Typography variant='heading_3'>Личные данные:</Typography>
      <form className={styles.form} onSubmit={handleSubmit(submited)}>
        <InputText
          {...register('firstName', { required: true })}
          errorMessage={errors.firstName?.message}
          placeholder='Имя'
          label='Имя'
        />
        <InputText
          {...register('lastName', { required: true })}
          errorMessage={errors.lastName?.message}
          placeholder='Фамилия'
          label='Фамилия'
        />
        <InputText
          {...register('workPhone', { required: true })}
          errorMessage={errors.workPhone?.message}
          placeholder='Рабочий телефон'
          label='Рабочий телефон'
        />
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              errorMessage={errors.department?.message}
              items={departmentItems}
              placeholder='Отдел'
              label='Отдел'
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
              label='Грейд'
            />
          )}
          control={control}
          name='grade'
        />
        <Textarea
          className={styles.about}
          {...register('about')}
          errorMessage={errors.about?.message}
          placeholder='Расскажите о себе...'
          label='О себе'
        />
        <Button className={styles.saveBtn} variant='filled-orange-md' disabled={!isDirty} type='submit'>Сохранить</Button>
      </form>
      <div className={styles.bottom}>
        <Button className={styles.deleteBtn} onClick={handleDelete} variant='text-sm'>Удалить аккаунт</Button>
        <Button onClick={onChangeCredentials} variant='text-sm'>Изменить пароль</Button>
      </div>
    </Modal>
  );
};
