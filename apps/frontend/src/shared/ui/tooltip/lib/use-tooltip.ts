import {
  offset,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react';
import { useState } from 'react';
import { useBreakpoint } from '@/shared/lib';

export const useTooltip = () => {
  const { isMobile } = useBreakpoint();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(isMobile ? 5 : 10)]
  });

  const role = useRole(context, { role: 'tooltip' });
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([role, hover]);

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 300,
    initial: {
      opacity: 0,
      pointerEvents: 'none'
    },
    open: {
      opacity: 1,
      pointerEvents: 'auto'
    }
  });

  const tooltipStyles = { ...floatingStyles, ...transitionStyles };

  return {
    refs,
    context,
    tooltipStyles,
    getReferenceProps,
    getFloatingProps,
    handleClose
  };
};
