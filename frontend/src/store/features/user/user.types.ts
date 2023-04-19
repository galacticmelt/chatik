import { User } from '../../../shared/types';

export type UserState = {
  user: User;
  isLoading: boolean;
  userError: {
    status: boolean;
    value: null | any;
  };
};
