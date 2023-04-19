import format from 'date-fns-tz/format';
import { v4 as uuidv4 } from 'uuid';
import { SocketUser } from '../store/features/socket/socket.types';

export const responseHandler = async (res: Response) => {
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }
  const data = await res.json();
  return data;
};

export const normalizeTime = (time: string) => {
  const parsed = new Date(time);
  const normalized = format(parsed, 'HH:mm');
  return normalized;
};

export const createSocketMessage = (
  onlineUsers: SocketUser[],
  chatID: string,
  companionID: string,
  loggedUserID: string,
  messageText: string
) => {
  const companionOnline = onlineUsers.find((user) => user.userId === companionID);
  const socketMessage = {
    receiverId: companionOnline ? companionOnline.socketId : loggedUserID,
    message: {
      id: uuidv4(),
      chatID: chatID,
      sender: loggedUserID,
      text: messageText,
      createdAt: Date.now()
    }
  };
  return socketMessage;
};

export const createHistoryMessage = (chatID: string, loggedUserID: string, messageText: string) => {
  return {
    sender: loggedUserID,
    chatId: chatID,
    text: messageText
  };
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

export function stringAvatar(name: string) {
  return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
}
