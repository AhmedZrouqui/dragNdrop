import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppContext } from '../../context/appContext';
import { Dots } from '../../assets';
import { animated, useSpring } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { calculateDistance } from '../../utils';

type IDraggableProps = React.PropsWithChildren;

function Draggable(props: IDraggableProps) {
  const ctx = useAppContext();
  const _ref = useRef<HTMLDivElement>(null);

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const isColliding = () => {
    const left = ctx?.leftRef.current.getBoundingClientRect();
    const right = ctx?.rightRef.current.getBoundingClientRect();

    const draggable = (_ref.current as HTMLDivElement).getBoundingClientRect();

    // Check for collision
    const isCloseToLeft = calculateDistance(
      draggable.x,
      draggable.y,
      left.x,
      left.y
    );

    const isCloseToRight = calculateDistance(
      draggable.x,
      draggable.y,
      right.x,
      right.y
    );

    return isCloseToLeft < isCloseToRight ? 'left' : 'right';
  };

  const bind = useDrag(({ down, event, movement: [mx, my] }) => {
    event.stopPropagation();

    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });

    if (down) {
      ctx?.handleOnDragItem((_ref.current?.children[1] as HTMLDivElement).id);
      console.log((_ref.current?.children[1] as HTMLInputElement).value);
    } else {
      setTimeout(() => {
        const target =
          isColliding() === 'left' ? 'left_dropzone' : 'right_dropzone';
        ctx?.handleMoveInput({
          id: ctx?.draggingItem as string,
          target: target,
        });
        ctx?.handleOnDragItem(null);
      }, 0);
    }
  });

  return (
    <animated.div
      {...bind()}
      ref={_ref}
      className={classNames(
        'border border-paper rounded-md relative p-1 pl-[22px] w-full flex items-center justify-center z-0',
        {
          '': ctx?.isMobile,
        }
      )}
      style={{ x, y, touchAction: 'none' }}
    >
      <div className="absolute top-0 left-0 cursor-pointer pointer-events-none h-full w-[22px] flex items-center justify-center">
        <img src={Dots} alt="dots-svg" />
      </div>

      {props.children}
    </animated.div>
  );
}

export default Draggable;
