import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMessages, postMessage } from '../../../api/messages-api';
import { createChat } from '../../../api/chats-api';
import { OutcomingHistoryMessage } from './messages.types';
import { normalizeMessages } from './messages.helpers';
import { normalizeNewChat } from './messages.helpers';
import { createHistoryMessage } from '../../../shared/helpers';
import { store } from '../../store';

export const setMessages = createAsyncThunk(
  'messages/setMessages',
  async (id: string, { rejectWithValue }) => {
    try {
      const messages = await fetchMessages(id);
      const normalized = normalizeMessages(messages);
      return normalized;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        return rejectWithValue(e.name + ': ' + e.message);
      }
    }
  }
);

export const sendMessage = createAsyncThunk(
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

export const initNewChat = createAsyncThunk(
  'messages/initChatAndSendMsg',
  async (users: string[], { rejectWithValue }) => {
    try {
      const newChat = await createChat(users);
      return normalizeNewChat(users[0], newChat);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.error.message);
    }
  }
);
