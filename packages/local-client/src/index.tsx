import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import CellList from './components/CellList';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
