import type { MenuProps } from './lib';
import type { ComponentProps } from 'react';
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
interface ItemProps extends ComponentProps<'li'> {
  disabled?: boolean;
}

const Item = ({ className, disabled, value, children, onClick, ...props }: ItemProps) => {
  const { handleClose } = useMenuContext();

  return (
    <Typography
      className={clsx(styles.option, disabled && styles.disabled, className)}
      onClick={handleClose}
      as='li'
      {...props}
    >
      {children}
    </Typography>
  );
};

export const Menu = {
  Root,
  Trigger,
  Popup,
  Item
};
