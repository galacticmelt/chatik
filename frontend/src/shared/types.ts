export interface IUserSignUp {
  username: string;
  email: string;
  password: string;
}

export interface IUserLogIn {
  email: string;
  password: string;
}

export type RawChat = {
  _id: string;
  users: {
    _id: string;
    username: string;
  }[];
};

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
};
