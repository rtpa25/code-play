import { FC, useEffect, useRef } from 'react';
import './Priview.css';

interface PriviewProps {
  code: string;
  bundlingStatus: string;
}

const html = `
<html>
  <head>
    <style>html{background-color: #fff;}</style>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (e) => {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + e + '</div>';
          console.error(e);
        }

        window.addEventListener('error', (event)=>{
          event.preventDefault();
          handleError(event.error)
        });

        window.addEventListener('message', (event) => {
          try{
            eval(event.data);
          }catch(e){
            handleError(e);
          }
        }, false);
      </script>
    </body>
  </head>
</html>
`;

const Priview: FC<PriviewProps> = ({ code, bundlingStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcDoc = html;

    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='priview-wrapper'>
      {/* the sandbox property allows to isolate the contents of the iframe */}
      <iframe
        srcDoc={html}
        title='sandbox'
        sandbox='allow-scripts'
        ref={iframe}
      />
      {bundlingStatus && <div className='preview-error'>{bundlingStatus}</div>}
    </div>
  );
};

export default Priview;
