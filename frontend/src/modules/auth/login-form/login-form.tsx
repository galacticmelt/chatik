import { TextField, Typography, Button } from '@mui/material';
import { memo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation, passValidation } from './login-validation';
import { ILogInFormProps, ILogInFormInputs } from './login-form.types';
import styles from './login-form.module.scss';

const LogInForm: React.FC<ILogInFormProps> = ({ submitFunc, redirectPath }: ILogInFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogInFormInputs>({ reValidateMode: 'onChange' });

  const onSubmit: SubmitHandler<ILogInFormInputs> = (data) => {
    const user = {
      email: data.email,
      password: data.password
    };
    console.log(user);
    submitFunc(user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.logInForm}>
      <Typography variant="h2">Log in</Typography>
      <TextField
        {...register('email', emailValidation)}
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
        Showtime!
      </Button>
    </form>
  );
};

export default memo(LogInForm);
