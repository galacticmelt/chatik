import { TextField, Typography, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { memo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation, passValidation } from './login-validation';
import { ILogInFormProps, ILogInFormInputs } from './login-form.types';
import styles from './login-form.module.scss';
import { useAppSelector } from '../../../store/hooks';

const LogInForm: React.FC<ILogInFormProps> = ({ submitFunc }: ILogInFormProps) => {
  const { authError, isLoading } = useAppSelector((state) => state.auth);

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
    <>
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
        {isLoading && <CircularProgress />}
      </form>
      <Snackbar open={authError.status} autoHideDuration={6000}>
        <Alert variant="filled" severity="error">
          {authError.value}
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(LogInForm);
