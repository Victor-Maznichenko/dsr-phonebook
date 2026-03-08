import type { SelectOwnProps } from './types';
import {
  autoUpdate,
  flip,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react';
import { useState } from 'react';

export const useSelect = ({ sideOffset = 8, items, value, onChange }: SelectOwnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  /*
  ======================
  Select choosed logic
  ======================
  */
  const [internalValue, setInternalValue] = useState<Nullable<string>>(value ?? null);
  const selectedValue = value ?? internalValue;
  const activeItem = items?.find((i) => i.value === selectedValue);

  const handleChange = (value: string) => {
    setInternalValue(value);
    handleClose();

    if (onChange) {
      onChange(value);
    }
  };

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
      size({
        apply({ elements }) {
          elements.floating.style.maxWidth = `${elements.reference.getBoundingClientRect().width}px`;
        }
      }),
      flip()
    ],
    placement: 'bottom',
    whileElementsMounted: autoUpdate
  });

  const role = useRole(context, { role: 'select' });
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

  const selectPopupStyles = { ...floatingStyles, ...transitionStyles };

  return {
    refs,
    context,
    activeItem,
    selectedValue,
    selectPopupStyles,
    getReferenceProps,
    getFloatingProps,
    handleChange,
    handleClose
  };
};
