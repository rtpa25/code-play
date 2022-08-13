import { FC } from 'react';

interface ActionBarButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  iconName: string;
}

const ActionBarButton: FC<ActionBarButtonProps> = ({ onClick, iconName }) => {
  return (
    <button className='button is-primary is-small' onClick={onClick}>
      <span className='icon'>
        <i className={`fas ${iconName}`} />
      </span>
    </button>
  );
};

export default ActionBarButton;
