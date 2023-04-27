export interface ISignUpFormProps {
  submitFunc: (user: ISignUpFormInputs) => void;
}

export interface ISignUpFormInputs {
  username: string;
  email: string;
  password: string;
}
