import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMessages, postMessage } from '../../../api/messages-api';
import { MessagesState, OutcomingHistoryMessage } from './messages.types';
import { normalizeMessages } from './messages.helpers';

const setMessages = createAsyncThunk(
  'messages/setMessages',
  async (id: string, { rejectWithValue }) => {
    try {
      const messages = await fetchMessages(id);
      return messages;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        return rejectWithValue(e.name + ': ' + e.message);
      }
    }
  }
);

const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (message: OutcomingHistoryMessage, { rejectWithValue }) => {
    try {
      const messages = await postMessage(message);
      return messages;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        return rejectWithValue(e.name + ': ' + e.message);
      }
    }
  }
);

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
    });
    builder.addCase(setMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      const normalized = normalizeMessages(action.payload);
      state.messagesRequested = true;
      state.messages = normalized;
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
  }
});

export const messagesActions = {
  setMessages,
  sendMessage,
  unsetCurrentChat: messagesSlice.actions.unsetCurrentChat,
  setCurrentChat: messagesSlice.actions.setCurrentChat
};

export default messagesSlice.reducer;
