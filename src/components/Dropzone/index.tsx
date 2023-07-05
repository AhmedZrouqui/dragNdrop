import classNames from 'classnames';
import React, { MouseEventHandler, forwardRef } from 'react';
import { ItemTypes } from '../../types';
import Draggable from '../Draggable';
import { useHover } from '@use-gesture/react';
import { useAppContext } from '../../context/appContext';

interface IDropzoneProps extends React.PropsWithChildren {
  id: string;
}

const Dropzone = forwardRef<HTMLDivElement, IDropzoneProps>((props, ref) => {
  /*const bind = useHover(({ ...props }) => {
    //console.log(props);
  });*/

  const ctx = useAppContext();

  /*const handleDrop = (e: any) => {
    if (ctx?.draggingItem) {
      console.log(ctx?.draggingItem);
      (e.target as HTMLDivElement).appendChild(
        ctx?.draggingItem as HTMLDivElement
      );
    }
  };*/

  const handleMouseEnter = () => {
    ctx?.handleIsOver((ref as React.RefObject<HTMLDivElement>).current);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      id={props.id}
      //{...bind()}
      className={classNames(
        'bg-darkGray w-[350px] h-[450px] rounded-lg shadow-default p-4 flex flex-col gap-2',
        {
          //'bg-opacity-50': isOver,
        }
      )}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

export default Dropzone;
