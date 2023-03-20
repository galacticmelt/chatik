export interface IFormProps {
  formTitle: string;
  btnTitle: string;
  submitFunc: (args: unknown) => void;
};

export interface IFormInputs {
  email: string;
  password: string;
};