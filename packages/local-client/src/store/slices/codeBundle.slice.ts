import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const CodeBundleSlice = createSlice({
  name: 'codeBundle',
  initialState: initialState,
  reducers: {
    getBundles(
      state: BundlesState = initialState,
      action: PayloadAction<{ code: string; cellId: string }>
    ) {
      const { code, cellId } = action.payload;
      state[cellId] = { loading: false, code: code, err: '' };
    },
    setBundleLoading(
      state: BundlesState = initialState,
      action: PayloadAction<{ cellId: string }>
    ) {
      const { cellId } = action.payload;
      state[cellId] = { loading: true, code: '', err: '' };
    },
    setBundleErr(
      state: BundlesState = initialState,
      action: PayloadAction<{ cellId: string; err: string }>
    ) {
      const { cellId, err } = action.payload;
      state[cellId] = { loading: false, code: '', err: err };
    },
  },
});

export const { getBundles, setBundleLoading, setBundleErr } =
  CodeBundleSlice.actions;

export default CodeBundleSlice.reducer;
