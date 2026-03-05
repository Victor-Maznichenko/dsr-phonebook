import type { ComponentProps } from 'react';
import clsx from 'clsx';
import { useId } from 'react';
import { Icons } from '../icons';
import { Tooltip } from '../tooltip';
import { Typography } from '../typography';
import styles from './styles.module.scss';

interface TextareaProps extends ComponentProps<'textarea'> {
  errorMessage?: string,
  readOnly?: boolean,
  label?: string,
}

const checkValueDefined = (value: number | string | readonly string[] | undefined) => {
  const isUndefined = value === undefined;
  const isNull = value === null;
  let isEmpty = false;

  if (typeof value === 'string') {
    isEmpty = !value.length;
  }

  return !isUndefined && !isNull && !isEmpty && !Array.isArray(value);
};

export const Textarea = ({
  className,
  errorMessage,
  disabled,
  readOnly,
  label,
  value,
  onChange,
  ...props
}: TextareaProps) => {
  const textareaId = useId();
  const isValueDefined = checkValueDefined(value);
  const isBlocked = readOnly || disabled || (isValueDefined && !onChange);
  const isInvalid = errorMessage && !isBlocked;

  const textareaProps = {
    value,
    disabled,
    readOnly,
    onChange,
    id: textareaId
  };

  return (
    <Typography
      className={
        clsx(
          styles.wrapper,
          isBlocked && styles.blocked,
          isInvalid && styles.invalid,
          className
        )}
      as='span'
    >
      {label && (
        <Typography className={styles.label} htmlFor={textareaId} variant='label' as='label'>
          {label}
        </Typography>
      )}
      <div className={styles.field}>
        <textarea
          className={clsx(styles.textarea, className)}
          {...textareaProps}
          {...props}
        />

        {isInvalid && (
          <Tooltip className={styles.errorTooltip}>
            <Tooltip.Trigger>
              <Icons.Error />
            </Tooltip.Trigger>
            <Typography as={Tooltip.Content} variant='text_S'>{errorMessage}</Typography>
          </Tooltip>
        )}
      </div>
    </Typography>
  );
};
