import { RawChat } from '../../../shared/types';
import { Contact } from './contacts.types';

export const normalizeContacts = (currentUserId: string, chats: RawChat[]): Contact[] => {
  const contacts = chats.map((chat) => {
    const contact = chat.users.find((user) => user._id !== currentUserId)!;
    const normalized = {
      chatId: chat._id,
      contactId: contact._id,
      contactName: contact.username,
      lastMessage: chat.lastMessage
    };
    return normalized;
  });
  return contacts;
};
