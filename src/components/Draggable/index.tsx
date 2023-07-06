import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppContext } from '../../context/appContext';
import { Dots } from '../../assets';
import { animated, useSpring } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { calculateDistance } from '../../utils';

interface IDraggableProps extends React.PropsWithChildren {
  inputId: string;
}

function Draggable(props: IDraggableProps) {
  const ctx = useAppContext();
  const _ref = useRef<HTMLDivElement>(null);

  const [isDown, setIsDown] = useState<string>();

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  /**
   *
   * Check for draggable's closest dropzone and returns left or right
   */
  const isColliding = () => {
    const left = ctx?.leftRef.current.getBoundingClientRect();
    const right = ctx?.rightRef.current.getBoundingClientRect();

    const draggable = (_ref.current as HTMLDivElement).getBoundingClientRect();

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

  const bind = useDrag(
    ({ args: [inputId], down, event, movement: [mx, my] }) => {
      event.stopPropagation();
      api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });

      if (down) setIsDown(inputId);

      if (!down) {
        setIsDown('');
        const target =
          isColliding() === 'left' ? 'left_dropzone' : 'right_dropzone';

        ctx?.handleMoveInput({
          id: inputId,
          target: target,
        });
      }
    }
  );

  return (
    <animated.div
      {...bind(props.inputId)}
      ref={_ref}
      className={classNames(
        'border border-paper select-none cursor-grab rounded-md relative p-1 pl-[22px] w-full flex items-center justify-center z-0',
        {
          '': ctx?.isMobile,
          'shadow-default': isDown,
        }
      )}
      style={
        (isDown === props.inputId && {
          x,
          y,
          cursor: 'grabbing',
          touchAction: 'none',
        }) || {
          touchAction: 'none',
        }
      }
    >
      <div className="absolute top-0 select-none left-0 cursor-pointer pointer-events-none h-full w-[22px] flex items-center justify-center">
        <img src={Dots} alt="dots-svg" />
      </div>

      {props.children}
    </animated.div>
  );
}

export default Draggable;
