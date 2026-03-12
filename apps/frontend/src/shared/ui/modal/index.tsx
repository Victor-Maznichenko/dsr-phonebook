import type { ComponentProps } from 'react';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import { ActionButton } from '@/shared/ui';
import styles from './styles.module.scss';

interface ModalProps extends ComponentProps<'div'> {
  onClose?: () => void;
  isOpen?: boolean;
}

const modalElement = document.getElementById('modal');

export const Modal = ({ children, className, isOpen, onClose, ...props }: ModalProps) => {
  if (!modalElement) return <></>;

  return ReactDOM.createPortal(
    <div className={clsx(styles.wrapper, isOpen && styles.open)} {...props}>
      <div className={clsx(styles.modal, className)}>
        {children}
        <ActionButton className={styles.closeBtn} onClick={onClose} name='Cross' />
      </div>
    </div>,
    modalElement
  );
};
