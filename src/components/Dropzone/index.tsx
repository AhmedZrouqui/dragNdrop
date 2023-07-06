import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useAppContext } from '../../context/appContext';
import _ from 'underscore';
import Draggable from '../Draggable';

interface IDropzoneProps extends React.PropsWithChildren {
  id: string;
}

const Dropzone = forwardRef<HTMLDivElement, IDropzoneProps>((props, ref) => {
  const ctx = useAppContext();

  const handleInputCreate = () => {
    ctx?.handleCreateInput({
      id: _.uniqueId('input_'),
      target: props.id,
      value: '',
    });
  };

  return (
    <div
      id={props.id}
      className={classNames(
        'bg-darkGray w-[350px] h-[450px] rounded-lg shadow-default p-4 flex rel flex-col gap-2',
        {
          //'bg-opacity-50': isOver,
          'w-full h-[300px]': ctx?.isMobile,
        }
      )}
      ref={ref}
    >
      <button
        role="button"
        onClick={handleInputCreate}
        className="py-2 select-none rounded-md text-white bg-paper text-sm hover:shadow-default transition-all ease-in-out transition-300"
      >
        Add Input
      </button>

      {ctx?.inputs &&
        ctx?.inputs
          .filter((input) => input.target === props.id)
          ?.map((input, index) => (
            <Draggable inputId={input.id} key={index}>
              <input
                role="textbox"
                type="text"
                value={input.value}
                id={input.id}
                className="rounded-sm px-3 select-none"
                placeholder="Type something..."
                onChange={(e) =>
                  ctx.handleInputChange({
                    id: input.id,
                    value: e.target.value,
                  })
                }
              />
            </Draggable>
          ))}
    </div>
  );
});

export default Dropzone;
