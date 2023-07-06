import { useEffect, useState } from 'react';

/**
 *
 * @param minWidth Accepts a minWidth (number) and returns wether the size of screen is equal or less than that number.
 *
 * @returns boolean
 */

export default function useWindowSize(minWidth: number) {
  const [state, setState] = useState({
    windowWidth: window.innerWidth,
    isDesiredWidth: false,
  });

  useEffect(() => {
    const getWindowSize = () => {
      const currentWindowWidth = window.innerWidth;
      const isDesiredWidth = currentWindowWidth < minWidth;
      setState({ windowWidth: currentWindowWidth, isDesiredWidth });
    };

    getWindowSize();

    window.addEventListener('resize', getWindowSize);

    return () => window.removeEventListener('resize', getWindowSize);
  }, [minWidth, state.windowWidth]);

  return state.isDesiredWidth;
}
