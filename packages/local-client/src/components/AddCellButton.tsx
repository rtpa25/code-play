import { FC } from 'react';

interface AddCellButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  buttonIcon: string;
  buttonText: string;
}

const AddCellButton: FC<AddCellButtonProps> = ({
  onClick,
  buttonIcon,
  buttonText,
}) => {
  return (
    <button className='button is-rounded is-primary is-small' onClick={onClick}>
      <span className='icon is-small'>
        <i className={`fas ${buttonIcon}`} />
      </span>
      <span>{buttonText}</span>
    </button>
  );
};

export default AddCellButton;
