import { IncomingHistoryMessage } from './messages.types';
import { RawChat } from '../../../shared/types';
import { NormalizedChat } from '../chats/chats.types';

export const normalizeMessages = (messages: IncomingHistoryMessage[]) => {
  const normalized = messages.reverse();
  return normalized;
};

export const normalizeNewChat = (currentUserId: string, chat: RawChat): NormalizedChat => {
  const companion = chat.users.find((user) => user._id !== currentUserId)!;
  const normalizedChat = {
    chatID: chat._id,
    companionID: companion._id,
    companionName: companion.username,
    lastMessage: chat.lastMessage
  };
  return normalizedChat;
};
