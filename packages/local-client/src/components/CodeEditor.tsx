import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { FC, useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './CodeEditor.css';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const editorDidMountHandler: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => onChange(editor.getValue()));
    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const formatCodeHandler = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={formatCodeHandler}>
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        height={'100%'}
        theme='vs-dark'
        language='javascript'
        onMount={editorDidMountHandler}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
