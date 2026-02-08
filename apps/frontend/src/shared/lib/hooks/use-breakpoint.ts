import { useEffect, useState } from 'react';

const BREAKPOINT = 1150;

export const useBreakpoint = () => {
  const isClient = typeof window !== 'undefined';

  // Initialize state from window width (function initializer to avoid reading on every render)
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    window.innerWidth < BREAKPOINT
  );

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);

    // no direct call to setIsMobile here — initial state already correct
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  return { isMobile };
};

// TODO РАЗОБРАТЬ
