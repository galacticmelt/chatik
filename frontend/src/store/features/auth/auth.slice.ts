import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';
import { logIn } from './auth.thunks';

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
