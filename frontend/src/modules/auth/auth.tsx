import { useState } from 'react';
import { Button } from '@mui/material';
import LogInForm from './login-form/login-form';
import SignInForm from './signin-form/signin-form';
import { signIn } from '../../api/auth-api';
import styles from './auth.module.scss';

export default function Auth() {
  const [hasAccount, setHasAccount] = useState(true);

  const hasAccountToggle = () => {
    setHasAccount((prevState) => !prevState);
  };
  return (
    <div className={styles.auth}>
      {hasAccount ? (
        <>
          <LogInForm submitFunc={() => console.log('logged')} />
          <Button onClick={hasAccountToggle} size="small" sx={{ mt: 1 }}>
            No account?
          </Button>
        </>
      ) : (
        <>
          <SignInForm submitFunc={signIn} />
          <Button onClick={hasAccountToggle} size="small" sx={{ mt: 1 }}>
            Already signed in?
          </Button>
        </>
      )}
    </div>
  );
}
