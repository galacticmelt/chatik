import { responseHandler } from '../shared/helpers';
import { API_ROUTES } from '../shared/constants';
import { OutcomingHistoryMessage } from '../store/features/messages/messages.types';

export const fetchMessages = async (chatId: string) => {
  try {
    const res = await fetch(API_ROUTES.MESSAGES + chatId);
    const data = await responseHandler(res);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.name + ': ' + err.message);
      throw err;
    }
  }
};

export const postMessage = async (message: OutcomingHistoryMessage) => {
  try {
    console.log(message);
    const res = await fetch(API_ROUTES.MESSAGES_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(message)
    });
    const data = await responseHandler(res);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.name + ': ' + err.message);
      throw err;
    }
  }
};
