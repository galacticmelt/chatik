import { responseHandler } from '../shared/helpers';
import { API_ROUTES } from '../shared/constants';

export const fetchChats = async (userId: string) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const res = await fetch(API_ROUTES.CHATS + userId);
    const data = await responseHandler(res);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.name + ': ' + err.message);
      throw err;
    }
  }
};
