import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { insertCellAfter } from '../store/slices/cells.slice';
import './AddCell.css';
import AddCellButton from './AddCellButton';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const dispatch = useDispatch();

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <AddCellButton
          onClick={() => {
            dispatch(insertCellAfter({ cellId: prevCellId, cellType: 'code' }));
          }}
          buttonIcon={'fa-plus'}
          buttonText={'Code'}
        />
        <AddCellButton
          onClick={() => {
            dispatch(insertCellAfter({ cellId: prevCellId, cellType: 'text' }));
          }}
          buttonIcon={'fa-plus'}
          buttonText={'Text'}
        />
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default AddCell;
