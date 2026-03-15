import type { ComponentProps } from 'react';

export interface MenuOwnProps {
  sideOffset?: number;
}

export interface MenuProps extends Omit<ComponentProps<'div'>, 'onChange'>, MenuOwnProps {
  errorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
}
