export interface ILogInFormProps {
  submitFunc: (user: ILogInFormInputs) => void;
  redirectPath: string;
}

export interface ILogInFormInputs {
  email: string;
  password: string;
}
