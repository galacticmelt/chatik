import { RawChat } from '../../../shared/types';
import { NormalizedChat } from './chats.types';

export const normalizeChats = (currentUserId: string, chats: RawChat[]): NormalizedChat[] => {
  const normalizedChats = chats.map((chat) => {
    const companion = chat.users.find((user) => user._id !== currentUserId)!;
    const normalizedChat = {
      chatID: chat._id,
      companionID: companion._id,
      companionName: companion.username
    };
    return normalizedChat;
  });
  return normalizedChats;
};
