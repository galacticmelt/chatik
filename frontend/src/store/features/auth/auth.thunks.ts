import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthData } from '../../../api/auth-api';
import { ILogInInputs, ILogInPayload } from './auth.types';

export const logIn = createAsyncThunk<ILogInPayload, ILogInInputs>(
  'auth/setTokens',
  async (credentials, { rejectWithValue }) => {
    try {
      const authData = await fetchAuthData(credentials);
      return authData;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        return rejectWithValue(e.name + ': ' + e.message);
      }
    }
  }
);
