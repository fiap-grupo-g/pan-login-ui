import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../plugin/context';

export const performPreLogin = createAsyncThunk('performPreLogin', async (preLoginRequest) => {
  const response = await axios.post(baseUrl + '/user/pre-login', preLoginRequest)
  return response.data;
});

export default { performPreLogin };
