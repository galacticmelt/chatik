import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { SocketUser, LiveMessage } from '../../../store/features/socket/socket.types';
import { IncomingHistoryMessage } from '../../../store/features/currentChat/currentChat.types';

export const createSocketMessage = (
  onlineUsers: SocketUser[],
  chatId: string,
  companionId: string,
  loggedUserId: string,
  messageText: string
) => {
  const companionOnline = onlineUsers.find((user) => user.userId === companionId);
  const socketMessage = {
    receiverId: companionOnline ? companionOnline.socketId : loggedUserId,
    message: {
      id: uuid(),
      chatId: chatId,
      sender: loggedUserId,
      text: messageText,
      createdAt: Date.now()
    }
  };
  return socketMessage;
};

export const createHistoryMessage = (chatId: string, loggedUserId: string, messageText: string) => {
  return {
    sender: loggedUserId,
    chatId: chatId,
    text: messageText
  };
};

export const normalizeMessageTime = (time: string) => {
  const parsed = dayjs(time);
  const normalized = parsed.format('HH:mm');
  return normalized;
};

export const normalizeLastMessageTime = (createdAt: string) => {
  const now = dayjs();
  const parsed = dayjs(createdAt);
  if (parsed.isSame(now, 'day')) return parsed.format('HH:mm');
  if (parsed.isSame(now.subtract(1, 'day'), 'day')) return 'yesterday';
  for (let i = 1; i <= 6; i++) {
    const dayOfWeek = now.subtract(i, 'day');
    if (parsed.isSame(dayOfWeek, 'day')) return parsed.format('ddd');
  }
  if (parsed.isSame(now, 'year')) return parsed.format('DD MMM');
  return parsed.format('DD.MM.YY');
};

export const prepareLastMessage = (
  loggedUserId: string,
  message: LiveMessage | IncomingHistoryMessage
) => {
  if (message.sender === loggedUserId) {
    return `You: ${message.text}`;
  }
  return message.text;
};

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string): string {
  const nameArr = name.split(' ');
  if (nameArr.length > 1) {
    return `${nameArr[0][0]}${nameArr[1][0]}`;
  }
  return `${nameArr[0][0]}`;
}

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
