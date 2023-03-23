export interface ILogInFormProps {
  submitFunc: (user: ILogInFormInputs) => void;
}

export interface ILogInFormInputs {
  email: string;
  password: string;
}
