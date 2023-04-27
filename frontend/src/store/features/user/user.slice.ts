import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './user.types';
import { setUser } from './user.thunks';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    userLoading: false,
    userError: {
      status: false,
      value: null
    }
  } as UserState,
  reducers: {
    unsetUser(state) {
      state.user = {};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.userLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(setUser.rejected, (state, action) => {
      state.userError.status = true;
      state.userError.value = action.payload.message;
    });
  }
});

export const userActions = {
  setUser,
  unsetUser: userSlice.actions.unsetUser
};

export default userSlice.reducer;
