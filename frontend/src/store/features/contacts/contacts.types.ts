import { IncomingHistoryMessage } from '../currentChat/currentChat.types';

export type Contact = {
  contactId: string;
  contactName: string;
  chatId: string;
  lastMessage: IncomingHistoryMessage;
};

export type ContactsState = {
  contacts: Contact[];
  contactsLoading: boolean;
  contactsError: {
    status: boolean;
    value: null | any;
  };
};
