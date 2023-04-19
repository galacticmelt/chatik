export interface ILogInPayload {
  accessToken: string;
  userId: string;
}

export interface ILogInInputs {
  email: string;
  password: string;
}

export type AuthState = {
  loggedUserID: string;
  isLoading: boolean;
  authError: {
    status: boolean;
    value: null | any;
  };
};
