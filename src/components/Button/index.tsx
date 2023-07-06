import classNames from 'classnames';
import { useAppContext } from '../../context/appContext';

interface IButtonProps {
  handler: () => void;
}

function Button(props: IButtonProps) {
  const ctx = useAppContext();

  return (
    <button
      onClick={props.handler}
      className={classNames(
        'bg-primary text-white p-4 min-w-[350px] rounded-lg shadow-default',
        {
          'w-full': ctx?.isMobile,
        }
      )}
    >
      <span>Save</span>
    </button>
  );
}

export default Button;
