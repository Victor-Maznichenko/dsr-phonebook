import {
  offset,
  useClick,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react';
import { useState } from 'react';

export const useSelect = ({ sideOffset = 8 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(sideOffset)]
  });

  const role = useRole(context, { role: 'select' });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([role, click]);

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

  const selectPopupStyles = { ...floatingStyles, ...transitionStyles };

  return {
    refs,
    context,
    selectPopupStyles,
    getReferenceProps,
    getFloatingProps,
    handleClose
  };
};
