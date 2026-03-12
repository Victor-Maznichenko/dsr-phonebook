import type { ComponentProps } from 'react';
import { useUnit } from 'effector-react';
import { DEPARTMENTS_LABELS, GRADE_LABELS } from '@/shared/lib';
import { Button, Modal, Typography } from '@/shared/ui';
import { model as pageModel } from '../../model';
import styles from './styles.module.scss';

export const ModalDetailedInfo = ({ onClose, ...props }: ComponentProps<typeof Modal>) => {
  const user = useUnit(pageModel.$user);

  if (!user) {
    return null;
  }

  return (
    <Modal className={styles.modal} onClose={onClose} {...props}>
      <Typography className={styles.title} variant='heading_3'>Подробная информация:</Typography>
      <div>
        <p>
          <Typography variant='label_M' as='span'>Дата рождения: </Typography>
          <Typography as='span'>{user.birthday.replaceAll('-', '.')}</Typography>
        </p>
        <p>
          <Typography variant='label_M' as='span'>Должность: </Typography>
          <Typography as='span'>{GRADE_LABELS[user.grade as keyof typeof GRADE_LABELS]}</Typography>
        </p>
        <p>
          <Typography variant='label_M' as='span'>Отдел: </Typography>
          <Typography as='span'>{DEPARTMENTS_LABELS[user.department as keyof typeof DEPARTMENTS_LABELS]}</Typography>
        </p>
        <p>
          <Typography variant='label_M' as='span'>Рабочий телефон: </Typography>
          <Typography as='span'>{user.workPhone}</Typography>
        </p>
      </div>
      <Button variant='filled-orange-md' onClick={onClose}>Понятно</Button>
    </Modal>
  );
};
