import { TextField, Typography, Button } from '@mui/material';
import { memo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation, passValidation } from './validation';
import { IFormProps, IFormInputs } from './form.types';
import styles from './form.module.scss';

const Form: React.FC<IFormProps> = ({ formTitle, btnTitle, submitFunc }: IFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({ reValidateMode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const user = {
      username: "testNew",
      email: data.email,
      password: data.password
    };
    console.log(user);
    submitFunc(user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Typography variant="h2">{formTitle}</Typography>
      <TextField
        {...register('email', emailValidation)}
        name="email"
        label="Email"
        size="small"
        fullWidth={true}
        error={errors.email ? true : false}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password', passValidation)}
        type="password"
        label="Password"
        size="small"
        fullWidth={true}
        error={errors.password ? true : false}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained">
        {btnTitle}
      </Button>
    </form>
  );
};

export default memo(Form);
