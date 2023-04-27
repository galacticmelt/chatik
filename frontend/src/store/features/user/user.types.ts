import { User } from '../../../shared/types';

export type UserState = {
  user: User;
  userLoading: boolean;
  userError: {
    status: boolean;
    value: null | any;
  };
};
