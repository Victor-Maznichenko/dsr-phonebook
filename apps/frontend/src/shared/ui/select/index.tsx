/* TODO:
СДЕЛАТЬ SELECT в будующем
*/

/* import type { ComponentProps } from 'react';
import { FloatingPortal } from '@floating-ui/react';
import clsx from 'clsx';
import { Children } from 'react';
import { SelectContext, useSelect, useSelectContext } from './lib';
import styles from './styles.module.scss';

type DefaultProps = ComponentProps<'div'>;
interface TooltipProps extends DefaultProps {
  sideOffset?: number;
}

const Select = ({ className, sideOffset, children, ...props }: TooltipProps) => {
  const config = useSelect({ sideOffset });

  return (
    <SelectContext value={config}>
      <div className={clsx(styles.select, className)} {...props}>
        {children}
      </div>
    </SelectContext>
  );
};

const Trigger = ({ className, children, ...props }: DefaultProps) => {
  const { refs, getReferenceProps } = useSelectContext();

  return (
    <div
      className={clsx(styles.tooltipTrigger, className)}
      ref={refs.setReference}
      {...props}
      {...getReferenceProps()}
    >
      {children}
    </div>
  );
};

interface ItemProps extends ComponentProps<'li'> {}

const Item = ({ className, children, ...props }: ItemProps) => {
  const { } = useSelectContext();

  return (
    <li className={clsx(styles.item, className)} role='option' {...props}>{children}</li>
  );
};

const Popup = ({ className, children, ...props }: DefaultProps) => {
  const { refs, selectPopupStyles, getFloatingProps } = useSelectContext();
  const d = Children.map(Item, () => <Item />);

  return (
    <FloatingPortal>
      <div
        className={clsx(styles.selectPopup, className)}
        style={selectPopupStyles}
        ref={refs.setFloating}
        {...getFloatingProps()}
        {...props}
      >
        <ul role='listbox'>
          {children}
        </ul>
      </div>
    </FloatingPortal>
  );
};

Select.Trigger = Trigger;
Select.Popup = Popup;
Select.Item = Item;

export { Select };
 */