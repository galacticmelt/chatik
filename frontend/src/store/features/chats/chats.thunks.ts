import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChats, createChat } from '../../../api/chats-api';
import { fetchAllUsers } from '../../../api/user-api';
import { normalizeChats } from './chats.helpers';

export const setChats = createAsyncThunk(
  'chats/setChats',
  async (id: string, { rejectWithValue }) => {
    try {
      const chats = await fetchChats(id);
      const normalized = normalizeChats(id, chats);
      return normalized;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.error.message);
    }
  }
);

export const setAllUsers = createAsyncThunk('chats/setAllUsers', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAllUsers();
    return data.user;
  } catch (e) {
    console.log(e);
    return rejectWithValue(e.error.message);
  }
});
