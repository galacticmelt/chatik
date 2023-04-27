import { API_ROUTES } from '../shared/constants';
import { IUserLogIn } from '../shared/types';
import { basicRequest } from './templates';
import { HTTPError } from 'ky';

export const fetchAuthData = async (user: IUserLogIn) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return await basicRequest
      .post(API_ROUTES.AUTH, {
        credentials: 'include',
        body: JSON.stringify(user)
      })
      .json();
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      throw err;
    }
    console.log(err);
  }
};

export const refreshAccess = async () => {
  try {
    return await basicRequest
      .post(API_ROUTES.REFRESH_ACCESS, {
        credentials: 'include'
      })
      .json();
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      throw err;
    }
    console.log(err);
  }
};
