import type { ComponentProps, ElementType } from 'react';

type TypographyStyle
  = | 'heading_L'
    | 'heading_M'
    | 'text_L'
    | 'text_M'
    | 'text_S';

interface TypographyOwnProps<E extends ElementType> {
  variant?: TypographyStyle;
  glitch?: boolean;
  as?: E;
}

export type TypographyProps<E extends ElementType> = TypographyOwnProps<E>
  & Omit<ComponentProps<E>, keyof TypographyOwnProps<E>>;
