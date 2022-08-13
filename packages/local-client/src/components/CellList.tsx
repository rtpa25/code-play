import { FC, Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import AddCell from './AddCell';
import CellListItem from './CellListItem';
import './CellList.css';
import {
  getCells,
  setCellsErr,
  setCellsLoading,
} from '../store/slices/cells.slice';
import axios from 'axios';
import { Cell } from '../interfaces/cell';

const CellList: FC = () => {
  const { data, order } = useAppSelector((state) => state.cells);
  const cells = order.map((id) => {
    return data[id];
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCells = async () => {
      dispatch(setCellsLoading());
      try {
        const { data } = await axios.get<Cell[]>('/cells');
        dispatch(getCells({ cells: data }));
      } catch (error: any) {
        dispatch(setCellsErr({ error: error.message }));
      }
      dispatch(setCellsLoading());
    };
    fetchCells();
  }, [dispatch]);

  //debouncing logic so that there is no post request on every key stroke
  useEffect(() => {
    let timer = setTimeout(async () => {
      dispatch(setCellsLoading());
      try {
        await axios.post('/cells', {
          cells: cells,
        });
      } catch (error: any) {
        dispatch(setCellsErr({ error: error.message }));
      }
      dispatch(setCellsLoading());
    }, 250);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cells), dispatch]);

  const rederedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell prevCellId={null} forceVisible={cells.length === 0} />
      {rederedCells}
    </div>
  );
};

export default CellList;
