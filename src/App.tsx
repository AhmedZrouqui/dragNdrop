import { ChangeEvent, useCallback, useState } from 'react';
import Layout from './components/Layout';
import Dropzone from './components/Dropzone';
import classNames from 'classnames';
import { useAppContext } from './context/appContext';
import Draggable from './components/Draggable';

function App() {
  const ctx = useAppContext();

  const [text, setText] = useState<string>('');

  const handleTextChange = useCallback((v: ChangeEvent<HTMLInputElement>) => {
    setText(v.target.value);
  }, []);

  return (
    <Layout>
      <div
        className={classNames(
          'flex gap-[80px] pt-[250px] m-auto items-center justify-center',
          {
            'flex-col': ctx?.isMobile,
          }
        )}
      >
        <Dropzone ref={ctx && ctx.leftRef} id="left_dropzone">
          <Draggable>
            <input
              className="z-10"
              type="text"
              placeholder="Type something..."
              value={text}
              onChange={handleTextChange}
            />
          </Draggable>
        </Dropzone>
        <Dropzone ref={ctx && ctx.rightRef} id="right_dropzone"></Dropzone>
      </div>
    </Layout>
  );
}

export default App;
