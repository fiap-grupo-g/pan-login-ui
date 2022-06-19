import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../plugin/context';
import { preparePassword } from '../../utils';

export const performLogin = createAsyncThunk('performLogin', async (LoginRequest) => {
  const password = preparePassword(LoginRequest.password);

  const response = await axios.post(baseUrl + '/user/login', 
    { cpfOrCnpj: LoginRequest.cpfCnpj, password },
    { headers: { 'X-Pan-Intent-Id': LoginRequest.intentId } });

  return response.data;
});

export default { performLogin };
