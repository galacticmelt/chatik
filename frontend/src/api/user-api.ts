import { HTTPError } from 'ky';
import { API_ROUTES } from '../shared/constants';
import { IUserSignUp } from '../shared/types';
import { basicRequest, bearerRequest } from './templates';

export const registerUser = async (user: IUserSignUp) => {
  try {
    return await basicRequest
      .post(API_ROUTES.USERS, {
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

export const fetchUserById = async (id: string) => {
  try {
    return await bearerRequest.get(API_ROUTES.USERS + id).json();
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      throw err;
    }
    console.log(err);
  }
};

export const fetchAllUsers = async () => {
  try {
    return await bearerRequest(API_ROUTES.USERS).json();
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      throw err;
    }
    console.log(err);
  }
};
