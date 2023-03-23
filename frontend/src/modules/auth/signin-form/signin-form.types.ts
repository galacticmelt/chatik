export interface ISignInFormProps {
  submitFunc: (user: ISignInFormInputs) => void;
}

export interface ISignInFormInputs {
  username: string;
  email: string;
  password: string;
}
