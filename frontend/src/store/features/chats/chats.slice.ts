import { createSlice } from '@reduxjs/toolkit';
import { ChatsState } from './chats.types';
import { setAllUsers, setChats } from './chats.thunks';

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: [],
    allUsers: [],
    isLoading: false,
    chatsError: {
      status: false,
      value: null
    }
  } as ChatsState,
  reducers: {
    unsetChats(state) {
      state.chats = [];
      state.allUsers = [];
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
      state.chatsError.value = action.payload.message;
    });
    builder.addCase(setAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload!;
    });
    builder.addCase(setAllUsers.rejected, (state, action) => {
      state.chatsError.status = true;
      state.chatsError.value = action.payload.message;
    });
  }
});

export const chatsActions = {
  setChats,
  setAllUsers,
  unsetChats: chatsSlice.actions.unsetChats
};

export default chatsSlice.reducer;
