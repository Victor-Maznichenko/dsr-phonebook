import type { MenuProps } from './lib';
import type { ComponentProps, ElementType } from 'react';
import { FloatingPortal } from '@floating-ui/react';
import clsx from 'clsx';
import { Typography } from '../typography';
import { MenuContext, useMenu, useMenuContext } from './lib';
import styles from './styles.module.scss';

/*
===================
Root component
===================
*/
const Root = ({ className, sideOffset, children, ...props }: MenuProps) => {
  const config = useMenu({ sideOffset });

  return (
    <MenuContext value={config}>
      <div className={clsx(styles.select, className)} {...props}>
        {children}
      </div>
    </MenuContext>
  );
};

/*
===================
Child Trigger component
===================
*/
const Trigger = ({ className, children, ...props }: ComponentProps<'div'>) => {
  const { refs, getReferenceProps } = useMenuContext();

  return (
    <div
      className={clsx(styles.trigger, className)}
      ref={refs.setReference}
      {...props}
      {...getReferenceProps()}
    >
      {children}
    </div>
  );
};

/*
===================
Child Popup component
===================
*/
const Popup = ({ className, children, ...props }: ComponentProps<'div'>) => {
  const { refs, menuPopupStyles, getFloatingProps } = useMenuContext();

  return (
    <FloatingPortal>
      <div
        className={clsx(styles.popup, className)}
        style={menuPopupStyles}
        ref={refs.setFloating}
        {...props}
        {...getFloatingProps()}
      >
        <ul className={styles.popupList}>{children}</ul>
      </div>
    </FloatingPortal>
  );
};

/*
===================
Child Item component
===================
*/
interface ItemOwnProps<T> {
  disabled?: boolean;
  as?: T;
}

type ItemProps<T extends ElementType = 'div'> = ItemOwnProps<T> & Omit<ComponentProps<T>, keyof ItemOwnProps<T>>;

const Item = <T extends ElementType = 'div'>({ className, disabled, children, as, ...props }: ItemProps<T>) => {
  const { handleClose } = useMenuContext();
  const Component = as || 'div';

  return (
    <Typography
      className={styles.option}
      onClick={handleClose}
      as='li'
    >
      <Component className={clsx(styles.option__inner, disabled && styles.disabled, className)} {...props}>
        {children}
      </Component>
    </Typography>
  );
};

export const Menu = {
  Root,
  Trigger,
  Popup,
  Item
};
