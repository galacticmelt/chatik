import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchChats } from '../../../api/chats-api';
import { ChatsState } from './chats.types';
import { normalizeChats } from './chats.helpers';

const setChats = createAsyncThunk('chats/setChats', async (id: string, { rejectWithValue }) => {
  try {
    const chats = await fetchChats(id);
    const normalized = normalizeChats(id, chats);
    return normalized;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return rejectWithValue(e.name + ': ' + e.message);
    }
  }
});

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: [],
    isLoading: false,
    chatsError: {
      status: false,
      value: null
    }
  } as ChatsState,
  reducers: {
    unsetChats(state) {
      state.chats = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setChats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setChats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chats = action.payload!;
    });
    builder.addCase(setChats.rejected, (state, action) => {
      state.chatsError.status = true;
      state.chatsError.value = action.payload;
    });
  }
});

export const chatsActions = {
  setChats,
  unsetChats: chatsSlice.actions.unsetChats
};

export default chatsSlice.reducer;
