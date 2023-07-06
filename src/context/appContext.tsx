import {
  createRef,
  useCallback,
  useState,
  createContext,
  useContext,
} from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { IAppContext, IInputType, ITableType } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAppProviderProps extends React.PropsWithChildren {}

const AppContext = createContext<IAppContext | undefined>(undefined);

export const useAppContext = () => useContext(AppContext);

function AppContextProvider({ children }: IAppProviderProps) {
  const isMobile = useWindowSize(768);
  const isDesktop = useWindowSize(1920);

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

  //refs
  const leftRef = createRef<HTMLDivElement>();
  const rightRef = createRef<HTMLDivElement>();

  /**
   * @param Object
   *
   * takes an `object` and add it to the inputs array.
   * objects will be rendered as <input /> later on.
   *
   * @returns void
   */

  const handleCreateInput = useCallback((obj: IInputType) => {
    setInputs((prev) => [...prev, obj]);
  }, []);

  /**
   * @param Object
   *
   * takes an `object` and mutates the target input if found
   *
   * @returns void
   */

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

  /**
   * @param Object
   *
   * takes an `object` and moves it to
   * the passed target (dropzone id).
   *
   * @returns void
   */

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

  /**
   * @param Object
   *
   * filters `inputs` and returns these at the right
   * dropzone alongside their values.
   *
   * @returns Array of objects
   */

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
