import type { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';
import { Button } from '../button';
import { Icons } from '../icons';
import styles from './styles.module.scss';

type ButtonVariants = 'default' | 'rounded';
interface InputProps extends ComponentProps<'input'> {
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url',
  startContent?: ReactNode,
  variant?: ButtonVariants,
  endContent?: ReactNode,
  hasClear?: boolean,
  label?: string,
}

export const Input = ({
  className,
  disabled,
  readOnly,
  hasClear,
  variant,
  value,
  ...props
}: InputProps) => {
  const isClearControl = hasClear && !disabled && !readOnly && value;

  return (
    <span className={clsx(styles.wrapper, variant && styles[variant], className)}>
      <input value={value} {...props} />

      {isClearControl && (
        <Button variant='unstyled'>
          <Icons.Cross />
        </Button>
      )}
    </span>
  );
};

// variants:  |
// Нужно корректно обрабатывать error для input
// Мб сделать Compound или render prop для иконки слева и справа
// Мб добавить маски туда или что то типа того
// Добавить prop label

/*                     {errorMessage && (
                        <Popover content={errorMessage}>
                            <span data-qa={CONTROL_ERROR_ICON_QA}>
                                <Icon
                                    data={TriangleExclamation}
                                    className={b('error-icon')}
                                    size={size === 's' ? 12 : 16}
                                />
                            </span>
                        </Popover>
                    )} */
