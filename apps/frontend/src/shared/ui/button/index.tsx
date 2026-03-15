import type { ComponentProps, ElementType } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

type ButtonVariants =
  | 'filled-orange-lg'
  | 'filled-orange-md'
  | 'filled-orange-sm'
  | 'filled-red-lg'
  | 'filled-red-md'
  | 'filled-red-sm'
  | 'filled-stone-lg'
  | 'filled-stone-md'
  | 'filled-stone-sm'
  | 'light-green-lg'
  | 'light-green-md'
  | 'light-green-sm'
  | 'light-orange-lg'
  | 'light-orange-md'
  | 'light-orange-sm'
  | 'text-md'
  | 'text-sm'
  | 'unstyled';

interface ButtonOwnProps<T> {
  variant?: ButtonVariants;
  disabled?: boolean;
  loading?: boolean;
  as?: T;
}

type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps<T> & Omit<ComponentProps<T>, keyof ButtonOwnProps<T>>;

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
    type: 'button' as const,
    disabled
  };

  return (
    <Component
      className={clsx(className, styles.button, styles[variant], isDisabled && styles.disabled)}
      {...(Component === 'button' ? defaultButtonProps : {})}
      {...props}
    >
      {loading ? 'Подождите...' : children}
    </Component>
  );
};

// TODO: Добавить Spinner с плавным появлением на кнопку лаконично (native/motion)
