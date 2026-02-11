import type { useSelect } from './use-select';
import { createContext, use } from 'react';

type SelectContextData = ReturnType<typeof useSelect>;

export const SelectContext = createContext<SelectContextData | null>(null);

export const useSelectContext = () => {
  const ctx = use(SelectContext);
  if (!ctx) {
    throw new Error('useSelectContext must be used within a <Select />');
  }
  return ctx;
};
