import { createSlice } from '@reduxjs/toolkit';
import { performPreLogin } from '../thunks/preLogin';

export const slice = createSlice({
  name: 'preLogin',
  initialState: {
    isLoading: false,
    isSuccess: false,
    error: null,
    preLogin: null,
  },
  reducers: {},
  extraReducers: {
    [performPreLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [performPreLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = null;
      state.preLogin = action.payload;
    },
    [performPreLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.error.message;
    },
  },
});

export default slice.reducer;
