import { createSlice } from '@reduxjs/toolkit';
import { MessagesState } from './messages.types';
import { setMessages, sendMessage, initNewChat } from './messages.thunks';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    chatID: '',
    companionID: '',
    companionName: '',
    messagesRequested: false,
    messages: [],
    isLoading: false,
    messagesError: {
      status: false,
      value: null
    }
  } as MessagesState,
  reducers: {
    unsetCurrentChat(state) {
      state.chatID = '';
      state.companionID = '';
      state.companionName = '';
      state.messages = [];
      state.messagesRequested = false;
    },
    setCurrentChat(state, action) {
      const { chatID, companionID, companionName } = action.payload;
      state.chatID = chatID;
      state.companionID = companionID;
      state.companionName = companionName;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setMessages.pending, (state) => {
      state.isLoading = true;
      state.messagesRequested = true;
    });
    builder.addCase(setMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    });
    builder.addCase(setMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.messagesError.status = true;
      state.messagesError.value = action.payload;
    });
    builder.addCase(sendMessage.pending, (state) => {
      return state;
    });
    builder.addCase(sendMessage.fulfilled, (state) => {
      return state;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.messagesError.status = true;
      state.messagesError.value = action.payload;
    });
    builder.addCase(initNewChat.pending, (state) => {
      return state;
    });
    builder.addCase(initNewChat.fulfilled, (state, action) => {
      const { chatID, companionID, companionName } = action.payload;
      state.chatID = chatID;
      state.companionID = companionID;
      state.companionName = companionName;
    });
    builder.addCase(initNewChat.rejected, (state, action) => {
      state.messagesError.status = true;
      state.messagesError.value = action.payload;
    });
  }
});

export const messagesActions = {
  setMessages,
  sendMessage,
  initNewChat,
  unsetCurrentChat: messagesSlice.actions.unsetCurrentChat,
  setCurrentChat: messagesSlice.actions.setCurrentChat
};

export default messagesSlice.reducer;
