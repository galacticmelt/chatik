import { IncomingHistoryMessage } from '../messages/messages.types';

export type NormalizedChat = {
  chatID: string;
  companionID: string;
  companionName: string;
  lastMessage: IncomingHistoryMessage;
};

export type SearchUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
};

export type ChatsState = {
  chats: NormalizedChat[];
  allUsers: SearchUser[];
  isLoading: boolean;
  chatsError: {
    status: boolean;
    value: null | any;
  };
};
