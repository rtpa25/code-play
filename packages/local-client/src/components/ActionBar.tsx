import { FC } from 'react';
import './ActionBar.css';
import { useAppDispatch } from '../hooks/redux';
import { deleteCell, moveCell } from '../store/slices/cells.slice';
import ActionBarButton from './ActionBarButton';

interface ActionBarProps {
  cellId: string;
}

const ActionBar: FC<ActionBarProps> = ({ cellId }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='action-bar'>
      <ActionBarButton
        onClick={() => {
          dispatch(moveCell({ cellId: cellId, direction: 'up' }));
        }}
        iconName={'fa-arrow-up'}
      />

      <ActionBarButton
        onClick={() => {
          dispatch(moveCell({ cellId: cellId, direction: 'down' }));
        }}
        iconName={'fa-arrow-down'}
      />

      <ActionBarButton
        onClick={() => {
          dispatch(deleteCell({ cellId: cellId }));
        }}
        iconName={'fa-times'}
      />
    </div>
  );
};

export default ActionBar;
