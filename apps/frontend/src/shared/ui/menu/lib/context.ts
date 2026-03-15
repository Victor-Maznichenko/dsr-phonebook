import type { useMenu } from './use-menu';
import { createContext, use } from 'react';

interface MenuContextData extends ReturnType<typeof useMenu> {};

export const MenuContext = createContext<MenuContextData | null>(null);

export const useMenuContext = () => {
  const ctx = use(MenuContext);
  if (!ctx) {
    throw new Error('useMenuContext must be used within a <Menu />');
  }
  return ctx;
};
