import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import classNames from 'classnames';
import { useAppContext } from '../../context/appContext';

function Button() {
  const ctx = useAppContext();

  return (
    <button
      className={classNames('bg-primary text-white px-5 rounded-lg', {
        'w-full': ctx?.isMobile,
      })}
    >
      Save
    </button>
  );
}

export default Button;
