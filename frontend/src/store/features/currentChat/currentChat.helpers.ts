import { IncomingHistoryMessage } from './currentChat.types';
import { RawChat } from '../../../shared/types';
import { Contact } from '../contacts/contacts.types';

export const normalizeMessages = (messages: IncomingHistoryMessage[]) => {
  return messages.reverse();
};

export const normalizeToCurrentChat = (currentUserId: string, chat: RawChat): Contact => {
  const companion = chat.users.find((user) => user._id !== currentUserId)!;
  const normalized = {
    chatId: chat._id,
    contactId: companion._id,
    contactName: companion.username,
    lastMessage: chat.lastMessage
  };
  return normalized;
};
