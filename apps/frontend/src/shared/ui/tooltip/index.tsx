import type { ComponentProps, ReactNode } from 'react';
import { FloatingPortal } from '@floating-ui/react';
import clsx from 'clsx';
import { useTooltip } from './use-tooltip';
import styles from './styles.module.scss';

interface TooltipProps extends ComponentProps<'div'> {
  triggerContent?: ReactNode,
}

export const Tooltip = ({ className, children, triggerContent, ...props }: TooltipProps) => {
  const { refs, tooltipStyles, getFloatingProps, getReferenceProps } = useTooltip();

  return (
    <div className={clsx(styles.tooltip, className)}>
      <div
        className={clsx(styles.tooltipTrigger, className)}
        ref={refs.setReference}
        {...props}
        {...getReferenceProps()}
      >
        {triggerContent}
      </div>
      <FloatingPortal>
        <div
          className={styles.tooltipContent}
          ref={refs.setFloating}
          style={tooltipStyles}
          {...getFloatingProps()}
        >
          {children}
        </div>
      </FloatingPortal>
    </div>
  );
};
