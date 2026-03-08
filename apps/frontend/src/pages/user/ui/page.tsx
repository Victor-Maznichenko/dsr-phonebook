import type { DepartmentValue, GradeValue } from '@/shared/lib';
import { useUnit } from 'effector-react';
import { DEPARTMENTS_LABELS, getPassedYears, GRADE_LABELS } from '@/shared/lib';
import { Avatar, Button, Textarea, Typography } from '@/shared/ui';
import { MODAL_TYPES } from '../lib';
import { model } from '../model';
import { ModalCredentials } from './modal-credentials';
import { ModalDetailedInfo } from './modal-detailed-info';
import { ModalPersonal } from './modal-personal';
import styles from './styles.module.scss';

export const UserPage = () => {
  const [havePremissions, user, currentModal, closeModal, setModal] = useUnit([
    model.$havePremissions,
    model.$user,
    model.$currentModal,
    model.closeModal,
    model.setModal
  ]);

  if (!user) {
    return null;
  }

  const { firstName, lastName, grade, department, birthday, about, avatar } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className='container'>
      <div className={styles.main}>
        <div className={styles.preview}>
          <Avatar variant='square' src={avatar} size={256} />
          <Typography variant='label_S'>{getPassedYears(birthday)} лет</Typography>
        </div>
        <div className={styles.info}>
          <Typography variant='heading_2'>{fullName}</Typography>
          <div>
            <Typography variant='text_S'>Должность: {GRADE_LABELS[grade as GradeValue]}</Typography>
            <Typography variant='text_S'>Отдел: {DEPARTMENTS_LABELS[department as DepartmentValue]}</Typography>
          </div>
          {about && <Textarea label='О себе' value={about} disabled />}
          <div className={styles.actions}>
            <Button onClick={() => setModal(MODAL_TYPES.DetailedInfo)} variant='filled-stone-sm'>Подробнее</Button>
            { havePremissions && <Button onClick={() => setModal(MODAL_TYPES.Personal)} variant='light-orange-sm'>Изменить</Button> }
          </div>
        </div>
        <ModalPersonal
          onChangeCredentials={() => setModal(MODAL_TYPES.Credentials)}
          isOpen={currentModal === MODAL_TYPES.Personal}
          onClose={closeModal}
        />
        <ModalCredentials isOpen={currentModal === MODAL_TYPES.Credentials} onClose={closeModal} />
        <ModalDetailedInfo isOpen={currentModal === MODAL_TYPES.DetailedInfo} onClose={closeModal} />
      </div>
    </div>
  );
};
