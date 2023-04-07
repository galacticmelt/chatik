import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserById } from '../../../api/auth-api';
import { IUserPayload } from './user.types';

type State = {
  user: any;
  isLoading: boolean;
  error: {
    status: boolean;
    value: null | any;
  };
};

const setUser = createAsyncThunk<IUserPayload, string>(
  'auth/setUser',
  async (id, { rejectWithValue }) => {
    try {
      const user = await fetchUserById(id);
      return user;
    } catch (e) {
      if (e instanceof Error) {
        console.log(rejectWithValue(e));
        return rejectWithValue(e);
      }
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLoading: false,
    error: {
      status: false,
      value: null
    }
  } as State,
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
      state.user = action.payload;
    });
    builder.addCase(setUser.rejected, (state, action) => {
      state.error.status = true;
      state.error.value = action.payload.message;
    });
  }
});

export const userActions = {
  setUser,
  unsetUser: userSlice.actions.unsetUser
};

export default userSlice.reducer;
