import type { SelectOwnProps } from './lib';
import type { ComponentProps, MouseEventHandler, ReactNode } from 'react';
import { FloatingPortal } from '@floating-ui/react';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Condition } from '../condition';
import { Icons } from '../icons';
import { Tooltip } from '../tooltip';
import { SelectContext, useSelect, useSelectContext } from './lib';
import styles from './styles.module.scss';

interface SelectProps extends Omit<ComponentProps<'div'>, 'onChange'>, SelectOwnProps {
  errorMessage?: string;
  disabled?: boolean;
}

/*
===================
Root component
===================
*/
const Root = ({
  className,
  items,
  value,
  onChange,
  sideOffset,
  errorMessage,
  children,
  disabled,
  ...props
}: SelectProps) => {
  const config = useSelect({ sideOffset, onChange, items, value });
  const isInvalid = !disabled && Boolean(errorMessage);

  const contextValue = useMemo(
    () => ({ ...config, disabled, errorMessage }),
    [config, disabled, errorMessage]
  );

  return (
    <SelectContext value={contextValue}>
      <div
        className={clsx(
          styles.select,
          isInvalid && styles.error,
          disabled && styles.disabled,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SelectContext>
  );
};

/*
===================
Child SelectWrapper component
===================
*/
const Wrapper = ({ children, ...props }: ComponentProps<'div'>) => <div {...props}>{children}</div>;

/*
===================
Child Label component
===================
*/
const Label = ({ className, children, ...props }: ComponentProps<'p'>) => (
  <p className={clsx(styles.label, className)} {...props}>
    {children}
  </p>
);

/*
===================
Child Trigger component
===================
*/
interface TriggerProps extends Omit<ComponentProps<'div'>, 'children'> {
  placeholder?: ReactNode;
}

const Trigger = ({ className, placeholder, ...props }: TriggerProps) => {
  const { refs, activeItem, selectedValue, disabled, errorMessage, getReferenceProps } =
    useSelectContext();
  const isInvalid = !disabled && Boolean(errorMessage);

  return (
    <div
      className={clsx(styles.trigger, !selectedValue && styles.placeholder, className)}
      ref={refs.setReference}
      {...props}
      {...getReferenceProps()}
    >
      <div className={styles.triggerText}>
        <Condition then={activeItem?.label ?? selectedValue} value={selectedValue} else={placeholder} />
      </div>
      <div className={styles.triggerActions}>
        <Icons.Arrows />
        {isInvalid && (
          <Tooltip className={styles.errorTooltip}>
            <Tooltip.Trigger>
              <Icons.Error />
            </Tooltip.Trigger>
            <Tooltip.Content>{errorMessage}</Tooltip.Content>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

/*
===================
Child Popup component
===================
*/
const Popup = ({ className, children, ...props }: ComponentProps<'div'>) => {
  const { refs, selectPopupStyles, getFloatingProps, disabled } = useSelectContext();

  if (disabled) {
    return null;
  }

  return (
    <FloatingPortal>
      <div
        className={clsx(styles.popup, className)}
        style={selectPopupStyles}
        ref={refs.setFloating}
        {...props}
        {...getFloatingProps()}
      >
        <ul className={styles.popupList} role='listbox'>
          {children}
        </ul>
      </div>
    </FloatingPortal>
  );
};

/*
===================
Child Item component
===================
*/
interface ItemProps extends ComponentProps<'li'> {
  value: string;
}

const Item = ({ className, value, children, onClick, ...props }: ItemProps) => {
  const { selectedValue, handleChange, disabled } = useSelectContext();
  const isActive = value === selectedValue;

  if (disabled) {
    return null;
  }

  const handleClick: MouseEventHandler<HTMLLIElement> = (event) => {
    handleChange(value);
    onClick?.(event);
  };

  return (
    <li
      className={clsx(styles.option, isActive && styles.active, className)}
      onClick={handleClick}
      role='option'
      {...props}
    >
      {isActive && <Icons.Check />}
      <span className={styles.optionText}>{children}</span>
    </li>
  );
};

const Select = ({ children, items, ...props }: SelectProps) => {
  if (!children && items) {
    return (
      <Root items={items} {...props}>
        <Trigger placeholder='Select apple' />
        <Popup>
          {items.map(({ label, value }) => (
            <Item value={value} key={value}>
              {label}
            </Item>
          ))}
        </Popup>
      </Root>
    );
  }

  return (
    <Root items={items} {...props}>
      {children}
    </Root>
  );
};

Select.Wrapper = Wrapper;
Select.Trigger = Trigger;
Select.Popup = Popup;
Select.Label = Label;
Select.Item = Item;

export { Select };
