import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserById } from '../../../api/user-api';
import { UserState } from './user.types';

const setUser = createAsyncThunk('auth/setUser', async (id: string, { rejectWithValue }) => {
  try {
    const user = await fetchUserById(id);
    return user;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return rejectWithValue(e.name + ': ' + e.message);
    }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLoading: false,
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
      state.isLoading = true;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(setUser.rejected, (state, action) => {
      state.userError.status = true;
      state.userError.value = action.payload;
    });
  }
});

export const userActions = {
  setUser,
  unsetUser: userSlice.actions.unsetUser
};

export default userSlice.reducer;
