import { Message } from './messages.types';

export const normalizeMessages = (messages: Message[]) => {
  const normalized = messages.reverse();
  return normalized;
};
