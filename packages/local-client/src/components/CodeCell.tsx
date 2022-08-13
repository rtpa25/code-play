import { FC, useEffect } from 'react';
import { bundler } from '../bundler';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Cell } from '../interfaces/cell';
import { updateCell } from '../store/slices/cells.slice';
import {
  getBundles,
  setBundleErr,
  setBundleLoading,
} from '../store/slices/codeBundle.slice';
import CodeEditor from './CodeEditor';
import Priview from './Priview';
import Resizable from './Resizable';
import './CodeCell.css';
import { useCumulativeCode } from '../hooks/useCumuliativeCode';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const bundle = useAppSelector((state) => state.bundle[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    const noBundleCase = async () => {
      if (!bundle) {
        dispatch(setBundleLoading({ cellId: cell.id }));
        try {
          const { code, err } = await bundler(cumulativeCode);
          if (err) throw err;
          dispatch(getBundles({ cellId: cell.id, code }));
        } catch (error) {
          dispatch(setBundleErr({ cellId: cell.id, err: error as string }));
        }
        return;
      }
    };
    noBundleCase();
    const timer = setTimeout(async () => {
      dispatch(setBundleLoading({ cellId: cell.id }));
      try {
        const { code, err } = await bundler(cumulativeCode);
        if (err) throw err;
        dispatch(getBundles({ cellId: cell.id, code }));
      } catch (error) {
        dispatch(setBundleErr({ cellId: cell.id, err: error as string }));
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, dispatch]);

  return (
    <Resizable direction={'vertical'}>
      <div
        style={{
          height: 'calc(100%)',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Resizable direction={'horizontal'}>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) => {
              dispatch(updateCell({ id: cell.id, content: value }));
            }}
          />
        </Resizable>
        <div className='bg'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                loading
              </progress>
            </div>
          ) : (
            <Priview code={bundle.code} bundlingStatus={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
