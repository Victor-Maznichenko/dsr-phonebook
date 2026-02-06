import type { ComponentProps, ElementType } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

type ButtonVariants =
  | 'filled-orange-lg'
  | 'filled-orange-md'
  | 'filled-orange-sm'
  | 'filled-stone-lg'
  | 'filled-stone-md'
  | 'filled-stone-sm'
  | 'light-green-lg'
  | 'light-green-md'
  | 'light-green-sm'
  | 'light-orange-lg'
  | 'light-orange-md'
  | 'light-orange-sm'
  | 'text'
  | 'unstyled';

type ButtonProps<T extends ElementType> = {
  variant?: ButtonVariants;
  disabled?: boolean;
  loading?: boolean;
  as?: T;
} & ComponentProps<T>;

export const Button = <T extends ElementType = 'button'>({
  variant = 'light-orange-md',
  className,
  children,
  disabled,
  loading,
  as,
  ...props
}: ButtonProps<T>) => {
  const isDisabled = loading || disabled;
  const Component = as || 'button';

  const defaultButtonProps = {
    type: props?.type || 'button',
    disabled: isDisabled
  };

  return (
    <Component
      className={clsx(className, styles.button, styles[variant], isDisabled && styles.disabled)}
      {...defaultButtonProps}
      {...props}
    >
      <span>{loading ? 'Подождите...' : children}</span>
    </Component>
  );
};

// TODO: Добавить Spinner с плавным появлением на кнопку лаконично (native/motion)
