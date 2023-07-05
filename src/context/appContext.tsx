import React, {
  ChangeEvent,
  createRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
  draggingItem: HTMLDivElement | null;
  handleOnDragItem: (element: HTMLDivElement | null) => void;
  elements: Array<IElementType>;
  handleElementChange: (fn: React.SetStateAction<IElementType[]>) => void;
  isOver: HTMLDivElement | null;
  handleIsOver: (v: HTMLDivElement | null) => void;
}

interface IElementType {
  items: React.ReactNode[];
  target: string;
}

const AppContext = React.createContext<IAppContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => React.useContext(AppContext);

function AppContextProvider({ children }: IAppProviderProps) {
  const isMobile = useWindowSize(768);
  const isDesktop = useWindowSize(1920);

  const [draggingItem, setDraggingItem] = useState<HTMLDivElement | null>(null);
  const [text, setText] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [isOver, setIsOver] = useState<HTMLDivElement | null>(null);

  const handleOnDragItem = useCallback((element: HTMLDivElement | null) => {
    setDraggingItem(element);
  }, []);

  const handleTextChange = useCallback((v: ChangeEvent<HTMLInputElement>) => {
    setText(v.target.value);
  }, []);

  const handleCheckChange = useCallback((v: ChangeEvent<HTMLInputElement>) => {
    setText(v.target.value);
  }, []);

  const handleIsOver = useCallback((v: HTMLDivElement | null) => {
    setIsOver(v);
  }, []);

  handleIsOver;

  const [elements, setElements] = useState<Array<IElementType>>([
    {
      items: [
        <Draggable>
          <div>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              checked={checked}
              onChange={handleCheckChange}
            />
            <label htmlFor="scales">Scales</label>
          </div>
        </Draggable>,
      ],
      target: 'left_dropzone',
    },
    {
      items: [
        <Draggable>
          <input
            type="text"
            placeholder="Type something..."
            value={text}
            onChange={handleTextChange}
          />
        </Draggable>,
      ],
      target: 'right_dropzone',
    },
  ]);

  const handleElementChange = useCallback(
    (fn: React.SetStateAction<IElementType[]>) => {
      setElements(fn);
    },
    []
  );

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
        elements,
        handleElementChange,
        isOver,
        handleIsOver,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
