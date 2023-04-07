import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAuthData } from '../../../api/auth-api';
import { ILogInInputs, ILogInPayload } from './auth.types';

const logIn = createAsyncThunk<ILogInPayload, ILogInInputs>(
  'auth/setTokens',
  async (credentials) => {
    try {
      const authData = await fetchAuthData(credentials);
      return authData;
    } catch (e) {
      console.log(e);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedUserID: sessionStorage.getItem('userId') || null,
    accessToken: sessionStorage.getItem('accessToken') || null,
    isLoading: false,
    error: false
  },
  reducers: {
    logOut(state) {
      state.loggedUserID = null;
      state.accessToken = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.loggedUserID = action.payload.userId;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.error = true;
    });
  }
});

export const authActions = {
  logOut: authSlice.actions.logOut,
  logIn
};

export default authSlice.reducer;
