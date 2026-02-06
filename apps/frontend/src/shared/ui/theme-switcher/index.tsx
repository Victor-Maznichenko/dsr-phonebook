import type { ComponentProps, MouseEvent } from 'react';
import { use } from 'react';
import { ThemeContext } from '@/shared/lib';
import { Button } from '../button';
import { Icons } from '../icons';
import styles from './styles.module.scss';

const getThemeSwitchAnimation = (x: number, y: number, isReverse?: boolean) => {
  const finalCircleRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const clipPath = [`circle(0% at ${x}px ${y}px)`, `circle(${finalCircleRadius}px at ${x}px ${y}px)`];

  return {
    keyframes: {
      clipPath: isReverse ? clipPath.reverse() : clipPath,
      zIndex: [1, 1]
    },
    animation: {
      duration: 500,
      easing: 'cubic-bezier(.76,.32,.29,.99)',
      pseudoElement: isReverse ? '::view-transition-old(root)' : '::view-transition-new(root)'
    }
  };
};

interface ThemeSwitcherProps extends ComponentProps<'button'> {
  onClick?: (event: MouseEvent) => void;
}

export const ThemeSwitcher = ({ onClick, ...props }: ThemeSwitcherProps) => {
  const { toggleTheme, theme } = use(ThemeContext);
  const isLightTheme = theme === 'light';

  const handleClick = (event: MouseEvent) => {
    const transition = document.startViewTransition(toggleTheme);

    transition.ready.then(() => {
      const { keyframes, animation } = getThemeSwitchAnimation(event.clientX, event.clientY, !isLightTheme);
      document.documentElement.animate(keyframes, animation);
    });

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button className={styles.btn} variant='unstyled' onClick={handleClick} {...props}>
      {isLightTheme ? <Icons.Sun /> : <Icons.Moon />}
    </Button>
  );
};
