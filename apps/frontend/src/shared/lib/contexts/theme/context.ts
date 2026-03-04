import { createContext } from 'react';

interface ThemeContextData {
  toggleTheme: () => void;
  theme: string | null;
}

export const ThemeContext = createContext<ThemeContextData>({
  theme: null,
  toggleTheme: () => {}
});
