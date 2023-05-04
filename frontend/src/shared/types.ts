import { IncomingHistoryMessage } from '../store/features/currentChat/currentChat.types';

export interface LogInData {
  email: string;
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export type RawChat = {
  _id: string;
  users: {
    _id: string;
    username: string;
  }[];
  lastMessage: IncomingHistoryMessage;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
};
