import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useAppContext } from '../../context/appContext';
import _ from 'underscore';
import Draggable from '../Draggable';

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

  const handleInputCreate = () => {
    ctx?.handleCreateInput({
      id: _.uniqueId('input_'),
      target: props.id,
      value: '',
    });
    console.log(ctx?.inputs.filter((input) => input.id === props.id));
  };

  return (
    <div
      id={props.id}
      //{...bind()}
      className={classNames(
        'bg-darkGray w-[350px] h-[450px] rounded-lg shadow-default p-4 flex rel flex-col gap-2',
        {
          //'bg-opacity-50': isOver,
        }
      )}
      ref={ref}
    >
      <button onClick={handleInputCreate}>create input</button>
      {ctx?.inputs &&
        ctx?.inputs
          .filter((input) => input.target === props.id)
          ?.map((input) => (
            <Draggable>
              <input
                type="text"
                value={input.value}
                id={input.id}
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
