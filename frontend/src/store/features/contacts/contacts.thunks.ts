import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChats, deleteChat } from '../../../api/chats-api';
import { normalizeContacts } from './contacts.helpers';

export const setContacts = createAsyncThunk(
  'contacts/setContacts',
  async (userId: string, { rejectWithValue }) => {
    try {
      const chats = await fetchChats(userId);
      const contacts = normalizeContacts(userId, chats);
      return contacts;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteChat',
  async (chatId: string, { rejectWithValue }) => {
    try {
      return await deleteChat(chatId);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);
