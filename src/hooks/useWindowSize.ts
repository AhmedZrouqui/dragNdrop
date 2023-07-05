import { useEffect, useState } from 'react';

/**
 *
 * @param minWidth Accepts a minWidth (number) and returns wether the size of screen is equal or less than that number.
 *
 * @returns
 */
export default function useWindowSize(minWidth: number) {
  const [state, setState] = useState({
    windowWidth: window.innerWidth,
    isDesiredWidth: false,
  });

  useEffect(() => {
    const onResize = () => {
      const currentWindowWidth = window.innerWidth;
      const isDesiredWidth = currentWindowWidth < minWidth;
      setState({ windowWidth: currentWindowWidth, isDesiredWidth });
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [minWidth, state.windowWidth]);

  return state.isDesiredWidth;
}
