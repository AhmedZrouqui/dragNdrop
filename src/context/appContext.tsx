import React, { ChangeEvent, createRef, useCallback, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import Draggable from '../components/Draggable';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAppProviderProps extends React.PropsWithChildren {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAppContext {
  isMobile: boolean;
  isDesktop: boolean;
  leftRef: any;
  rightRef: any;
  draggingItem: string | null;
  handleOnDragItem: (element: string | null) => void;
  isOver: string | null;
  handleIsOver: (v: string | null) => void;
  handleCreateInput: (v: IInputType) => void;
  inputs: Array<IInputType>;
  handleInputChange: (obj: Pick<IInputType, 'id' | 'value'>) => void;
  handleMoveInput: (obj: Pick<IInputType, 'id' | 'target'>) => void;
}

interface IInputType {
  target: string;
  value: string;
  id: string;
}

const AppContext = React.createContext<IAppContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => React.useContext(AppContext);

function AppContextProvider({ children }: IAppProviderProps) {
  const isMobile = useWindowSize(768);
  const isDesktop = useWindowSize(1920);

  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [isOver, setIsOver] = useState<string | null>(null);

  /**
   *
   * inputs data type:
   * {
   *  target: string (dropzone id)
   *  value: ""
   *  id: ""
   * }
   *
   */

  const [inputs, setInputs] = useState<Array<IInputType>>([]);

  const handleCreateInput = useCallback(
    (obj: IInputType) => {
      console.log(obj);
      setInputs((prev) => [...prev, obj]);
    },
    [inputs]
  );

  const handleInputChange = useCallback(
    (obj: Pick<IInputType, 'id' | 'value'>) => {
      const input = inputs.filter((_input) => _input.id === obj.id);
      console.log(input);

      if (input) {
        setInputs((prev) => {
          const newArray = [...prev];
          const i = prev.indexOf(input[0]);
          input[0].value = obj.value;
          newArray[i] = input[0];

          return newArray;
        });
      }
    },
    [inputs]
  );

  const handleMoveInput = useCallback(
    (obj: Pick<IInputType, 'id' | 'target'>) => {
      const input = inputs.filter((_input) => _input.id === obj.id);

      if (input) {
        setInputs((prev) => {
          const newArray = [...prev];
          const i = prev.indexOf(input[0]);
          if (input[0].target !== obj.target) {
            input[0].target = obj.target;
            newArray.splice(i, 1);
            newArray.push(input[0]);
            return newArray;
          }
          input[0].target = obj.target;
          newArray[i] = input[0];

          return newArray;
        });
      }
    },
    [inputs]
  );

  const handleOnDragItem = useCallback((element: string | null) => {
    setDraggingItem(element);
  }, []);

  const handleIsOver = useCallback((v: string | null) => {
    setIsOver(v);
  }, []);

  const leftRef = createRef<HTMLDivElement>();
  const rightRef = createRef<HTMLDivElement>();

  return (
    <AppContext.Provider
      value={{
        isMobile,
        isDesktop,
        leftRef,
        rightRef,
        draggingItem,
        handleOnDragItem,
        isOver,
        handleIsOver,
        handleCreateInput,
        inputs,
        handleMoveInput,
        handleInputChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
