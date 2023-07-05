import React, { useRef } from 'react';
import classNames from 'classnames';
import { useAppContext } from '../../context/appContext';
import { Dots } from '../../assets';
import { animated, useSpring } from 'react-spring';
import { useDrag } from '@use-gesture/react';

type IDraggableProps = React.PropsWithChildren;

function Draggable(props: IDraggableProps) {
  const ctx = useAppContext();
  const _ref = useRef<HTMLDivElement>(null);

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(({ down, event, movement: [mx, my], ...props }) => {
    event.stopPropagation();

    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });

    if (down) {
      ctx?.handleOnDragItem(_ref.current as HTMLDivElement);
    } else {
      if (ctx?.isOver) {
        console.log(ctx.isOver);
        (_ref.current as HTMLDivElement).parentElement?.removeChild(
          _ref.current as HTMLDivElement
        );
        ctx.isOver.appendChild(_ref.current as Node);
      }
      setTimeout(() => {
        ctx?.handleOnDragItem(null);
        ctx?.handleIsOver(null);
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
