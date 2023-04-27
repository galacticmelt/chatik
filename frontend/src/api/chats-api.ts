import { API_ROUTES } from '../shared/constants';
import { HTTPError } from 'ky';
import { bearerRequest } from './templates';

export const fetchChats = async (userId: string) => {
  try {
    return await bearerRequest(API_ROUTES.CHATS_GET + userId).json();
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      throw err;
    }
    console.log(err);
  }
};

export const createChat = async (users: string[]) => {
  try {
    return await bearerRequest
      .post(API_ROUTES.CHATS_POST, {
        body: JSON.stringify({ users })
      })
      .json();
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      throw err;
    }
    console.log(err);
  }
};
