import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserById } from '../../../api/user-api';

export const setUser = createAsyncThunk('auth/setUser', async (id: string, { rejectWithValue }) => {
  try {
    const user = await fetchUserById(id);
    return user;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.name + ': ' + e.message);
      return rejectWithValue(e.message);
    }
  }
});
