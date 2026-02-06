import type { JSX, ReactElement } from 'react';

interface IconProps {
  className?: string;
  fill?: string;
  size?: number;
}
export type IconType = (props: IconProps) => ReactElement | null;

export const withDefaultProps =
  (Icon: IconType) =>
    ({ size, ...props }: IconProps): JSX.Element => <Icon size={size} {...props} />;
