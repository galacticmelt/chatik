import { responseHandler } from '../shared/helpers';
import { API_ROUTES } from '../shared/constants';
import { IUserLogIn, IUserSignUp } from '../shared/types';

export const signUp = async (user: IUserSignUp) => {
  try {
    const res = await fetch(API_ROUTES.AUTH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    });
    const data = await responseHandler(res);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.name + ': ' + err.message);
    }
    throw err;
  }
};

export const fetchAuthData = async (user: IUserLogIn) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const res = await fetch(API_ROUTES.AUTH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      credentials: 'include',
      body: JSON.stringify(user)
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

export const refreshAccess = async () => {
  try {
    const res = await fetch(API_ROUTES.REFRESH_ACCESS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      credentials: 'include'
    });
    const data = await responseHandler(res);
    sessionStorage.setItem('accessToken', data.accessToken);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.name + ': ' + err.message);
      throw err;
    }
  }
};
