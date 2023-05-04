import { createSlice } from '@reduxjs/toolkit';
import { ContactsState } from './contacts.types';
import { setContacts, deleteContact } from './contacts.thunks';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    contactsLoading: false,
    contactsError: {
      status: false,
      value: null
    }
  } as ContactsState,
  reducers: {
    unsetOneContact(state, action) {
      const chatId = action.payload;
      state.contacts = state.contacts.filter((contact) => contact.chatId !== chatId);
    },
    unsetContacts(state) {
      state.contacts = [];
    },
    setSocketLastMessage(state, action) {
      const { chatId, socketMessage } = action.payload;
      const contact = state.contacts.find((contact) => contact.chatId === chatId);
      contact.lastMessage = socketMessage;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setContacts.pending, (state) => {
      state.contactsError.status = false;
      state.contactsError.value = null;
      state.contactsLoading = true;
    });
    builder.addCase(setContacts.fulfilled, (state, action) => {
      state.contactsLoading = false;
      state.contacts = action.payload!;
    });
    builder.addCase(setContacts.rejected, (state, action) => {
      state.contactsError.status = true;
      state.contactsError.value = action.payload.message;
    });
    builder.addCase(deleteContact.pending, (state) => {
      state.contactsError.status = false;
      state.contactsError.value = null;
      state.contactsLoading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.contactsLoading = false;
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.contactsError.status = true;
      state.contactsError.value = action.payload;
    });
  }
});

export const contactsActions = {
  setContacts,
  deleteContact,
  unsetContacts: contactsSlice.actions.unsetContacts,
  unsetOneContact: contactsSlice.actions.unsetOneContact,
  setSocketLastMessage: contactsSlice.actions.setSocketLastMessage
};

export default contactsSlice.reducer;
