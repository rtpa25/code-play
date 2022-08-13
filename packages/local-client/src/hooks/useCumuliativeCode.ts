import { useAppSelector } from './redux';

export const useCumulativeCode = (cellId: string) => {
  return useAppSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    //var show ensures it can be defined multiple times
    //using react17 for the show functions to work
    const showFunc = `
    import _React from 'react@17.0.2';
    import _ReactDOM from 'react-dom@17.0.2';
    
    var show = (value) => {
      const root =  document.querySelector('#root');

      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    }
  `;
    const showFuncNoop = `var show = () => {}`;
    const cum = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cum.push(showFunc);
        } else {
          cum.push(showFuncNoop);
        }
        cum.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cum;
  }).join('\n');
};
