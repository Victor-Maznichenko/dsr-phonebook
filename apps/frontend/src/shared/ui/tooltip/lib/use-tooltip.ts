import {
  offset,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react';
import { useState } from 'react';

export const useTooltip = ({ sideOffset = 8 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(sideOffset)]
  });

  const role = useRole(context, { role: 'tooltip' });
  const hover = useHover(context, { delay: { close: 150 } });
  const { getReferenceProps, getFloatingProps } = useInteractions([role, hover]);

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 300,
    initial: { opacity: 0, pointerEvents: 'none' },
    open: { opacity: 1, pointerEvents: 'auto' }
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
