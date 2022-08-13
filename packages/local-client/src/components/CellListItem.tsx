import { FC } from 'react';
import { Cell } from '../interfaces/cell';
import ActionBar from './ActionBar';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import './CellListItem.css';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  if (cell.type === 'code') {
    child = (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar cellId={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar cellId={cell.id} />
      </>
    );
  }

  return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
