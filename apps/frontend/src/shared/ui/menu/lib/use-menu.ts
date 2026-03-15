import type { MenuOwnProps } from './types';
import {
  autoUpdate,
  flip,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react';
import { useState } from 'react';

export const useMenu = ({ sideOffset = 8 }: MenuOwnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  /*
  ======================
  Floating UI logic
  ======================
  */
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(sideOffset),
      flip()
    ],
    placement: 'bottom',
    whileElementsMounted: autoUpdate
  });

  const role = useRole(context, { role: 'menu' });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([role, click, dismiss]);

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

  const menuPopupStyles = { ...floatingStyles, ...transitionStyles };

  return {
    refs,
    context,
    menuPopupStyles,
    getReferenceProps,
    getFloatingProps,
    handleClose
  };
};
