import { TextField, Typography, Button } from '@mui/material';
import { memo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation, passValidation } from './signup-validation';
import { ISignUpFormProps, ISignUpFormInputs } from './signup-form.types';
import styles from './signup-form.module.scss';

const SignUpForm: React.FC<ISignUpFormProps> = ({ submitFunc }: ISignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignUpFormInputs>({ reValidateMode: 'onChange' });

  const onSubmit: SubmitHandler<ISignUpFormInputs> = (data) => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password
    };
    console.log(user);
    submitFunc(user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signUpForm}>
      <Typography variant="h2">Sign up</Typography>
      <TextField
        {...register('username', { required: 'Please enter your name' })}
        label="Name"
        size="small"
        fullWidth={true}
        error={errors.username ? true : false}
        helperText={errors.username?.message}
      />
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
        Let&#39;s go!
      </Button>
    </form>
  );
};

export default memo(SignUpForm);
