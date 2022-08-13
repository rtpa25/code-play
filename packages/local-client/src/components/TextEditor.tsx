import MDEditor from '@uiw/react-md-editor';
import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { Cell } from '../interfaces/cell';
import { updateCell } from '../store/slices/cells.slice';
import './TextEditor.css';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className='text-editor'>
        <MDEditor
          value={cell.content}
          onChange={(v) => {
            dispatch(updateCell({ id: cell.id, content: v || '' }));
          }}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className='text-editor card'>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || '# Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
