import { configureStore } from '@reduxjs/toolkit';
import CellSliceActions from './slices/cells.slice';
import CodeBundleActions from './slices/codeBundle.slice';

const store = configureStore({
  reducer: {
    cells: CellSliceActions,
    bundle: CodeBundleActions,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
