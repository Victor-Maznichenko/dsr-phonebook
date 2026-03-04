import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from '@/shared/lib/hooks';
import { ThemeContext } from './context';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage({ key: 'theme' });

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  useEffect(() => {
    if (theme) {
      document.body.setAttribute('data-theme', theme);
      return;
    }

    setTheme('dark');
    document.body.setAttribute('data-theme', 'dark');
  }, [theme, setTheme]);

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};
