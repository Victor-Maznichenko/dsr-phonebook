import type { ComponentProps } from 'react';
import { FloatingPortal } from '@floating-ui/react';
import clsx from 'clsx';
import { TooltipContext, useTooltip, useTooltipContext } from './lib';
import styles from './styles.module.scss';

type DefaultProps = ComponentProps<'div'>;
interface TooltipProps extends DefaultProps {
  sideOffset?: number;
}

/*
===================
Root component
===================
*/
const Tooltip = ({ className, sideOffset, children, ...props }: TooltipProps) => {
  const config = useTooltip({ sideOffset });

  return (
    <TooltipContext value={config}>
      <div className={clsx(styles.tooltip, className)} {...props}>
        {children}
      </div>
    </TooltipContext>
  );
};

/*
===================
Child Trigger component
===================
*/
const Trigger = ({ className, children, ...props }: DefaultProps) => {
  const { refs, getReferenceProps } = useTooltipContext();

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

/*
===================
Child Content component
===================
*/
const Content = ({ className, children, ...props }: DefaultProps) => {
  const { refs, tooltipStyles, getFloatingProps } = useTooltipContext();

  return (
    <FloatingPortal>
      <div
        className={clsx(styles.tooltipContent, className)}
        ref={refs.setFloating}
        style={tooltipStyles}
        {...props}
        {...getFloatingProps()}
      >
        {children}
      </div>
    </FloatingPortal>
  );
};

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;

export { Tooltip };
