import { createSlice } from '@reduxjs/toolkit';
import { performLogin } from '../thunks/Login';

export const slice = createSlice({
  name: 'Login',
  initialState: {
    isLoading: false,
    isSuccess: false,
    error: null,
    login: null,
  },
  reducers: {},
  extraReducers: {
    [performLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [performLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = null;
      state.login = action.payload;
    },
    [performLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.error.message;
    },
  },
});

export default slice.reducer;
