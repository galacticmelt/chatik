import { API_ROUTES } from '../shared/constants';
import { OutcomingHistoryMessage } from '../store/features/messages/messages.types';
import { HTTPError } from 'ky';
import { bearerRequest } from './templates';

export const fetchMessages = async (chatId: string) => {
  try {
    return await bearerRequest.get(API_ROUTES.MESSAGES_GET + chatId).json();
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      throw err;
    }
    console.log(err);
  }
};

export const postMessage = async (message: OutcomingHistoryMessage) => {
  try {
    return await bearerRequest
      .post(API_ROUTES.MESSAGES_POST, {
        body: JSON.stringify(message)
      })
      .json();
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      throw err;
    }
    console.log(err);
  }
};
