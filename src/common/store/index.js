import { configureStore } from '@reduxjs/toolkit';

import performPreLogin from './reducers/preLogin';
import performLogin from './reducers/Login';

export default configureStore({
  reducer: {
    performPreLogin,
    performLogin,
  },
});
