import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAuthData } from '../../../api/auth-api';
import { ILogInInputs, ILogInPayload } from './auth.types';
import { AuthState } from './auth.types';

const logIn = createAsyncThunk<ILogInPayload, ILogInInputs>(
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedUserID: sessionStorage.getItem('userId') || '',
    isLoading: false,
    authError: {
      status: false,
      value: null
    }
  } as AuthState,
  reducers: {
    logOut(state) {
      state.loggedUserID = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loggedUserID = action.payload.userId;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.authError.status = true;
      state.authError.value = action.payload;
    });
  }
});

export const authActions = {
  logOut: authSlice.actions.logOut,
  logIn
};

export default authSlice.reducer;
