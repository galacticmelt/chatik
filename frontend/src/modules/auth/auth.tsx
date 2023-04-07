import { useState } from 'react';
import { Button } from '@mui/material';
import LogInForm from './login-form/login-form';
import SignUpForm from './signup-form/signup-form';
import { signUp } from '../../api/auth-api';
import { authActions } from '../../store/features/auth/auth.slice';
import styles from './auth.module.scss';
import { useAppDispatch } from '../../store/hooks';

export default function Auth() {
  const dispatch = useAppDispatch();
  const [hasAccount, setHasAccount] = useState(true);

  const hasAccountToggle = () => {
    setHasAccount((prevState) => !prevState);
  };

  return (
    <div className={styles.auth}>
      {hasAccount ? (
        <>
          <LogInForm submitFunc={(user) => dispatch(authActions.logIn(user))} />
          <Button onClick={hasAccountToggle} size="small" sx={{ mt: 1 }}>
            No account?
          </Button>
        </>
      ) : (
        <>
          <SignUpForm submitFunc={signUp} />
          <Button onClick={hasAccountToggle} size="small" sx={{ mt: 1 }}>
            Already signed up?
          </Button>
        </>
      )}
    </div>
  );
}
