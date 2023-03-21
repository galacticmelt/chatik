export interface ISignInFormProps {
  submitFunc: (user: ISignInFormInputs) => void;
  redirectPath: string;
}

export interface ISignInFormInputs {
  username: string;
  email: string;
  password: string;
}
