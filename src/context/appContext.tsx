import {
  createRef,
  useCallback,
  useState,
  createContext,
  useContext,
} from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { ITableType } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAppProviderProps extends React.PropsWithChildren {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAppContext {
  isMobile: boolean;
  isDesktop: boolean;
  leftRef: any;
  rightRef: any;
  isOver: string | null;
  handleIsOver: (v: string | null) => void;
  handleCreateInput: (v: IInputType) => void;
  inputs: Array<IInputType>;
  handleInputChange: (obj: Pick<IInputType, 'id' | 'value'>) => void;
  handleMoveInput: (obj: Pick<IInputType, 'id' | 'target'>) => void;
  getRightSideData: () => ITableType[];
}

interface IInputType {
  target: string;
  value: string;
  id: string;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

function AppContextProvider({ children }: IAppProviderProps) {
  const isMobile = useWindowSize(768);
  const isDesktop = useWindowSize(1920);

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

  const handleCreateInput = useCallback((obj: IInputType) => {
    setInputs((prev) => [...prev, obj]);
  }, []);

  const handleInputChange = useCallback(
    (obj: Pick<IInputType, 'id' | 'value'>) => {
      const input = inputs.filter((_input) => _input.id === obj.id);
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
          //store prev state in new array
          const newArray = [...prev];

          //get moved object's index
          const i = prev.indexOf(input[0]);

          //if object is dropped in different drop zone
          if (input[0].target !== obj.target) {
            input[0].target = obj.target;
            newArray.splice(i, 1);
            newArray.push(input[0]);
            return newArray;
          }

          //else we put it on the same index
          input[0].target = obj.target;
          newArray[i] = input[0];

          return newArray;
        });
      }
    },
    [inputs]
  );

  const handleIsOver = useCallback((v: string | null) => {
    setIsOver(v);
  }, []);

  const leftRef = createRef<HTMLDivElement>();
  const rightRef = createRef<HTMLDivElement>();

  const getRightSideData = useCallback(() => {
    const data = inputs.filter((input) =>
      input.target.toLowerCase().includes('right')
    );

    if (!data) {
      return [];
    }

    return data.map((input) => ({
      id: input.id,
      value: input.value,
    })) as ITableType[];
  }, [inputs]);

  return (
    <AppContext.Provider
      value={{
        isMobile,
        isDesktop,
        leftRef,
        rightRef,
        isOver,
        handleIsOver,
        handleCreateInput,
        inputs,
        handleMoveInput,
        handleInputChange,
        getRightSideData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
