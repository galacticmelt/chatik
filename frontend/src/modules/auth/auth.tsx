import { useState } from 'react';
import { Button } from '@mui/material';
import Form from './form/form';
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
          <Form formTitle="Вход" btnTitle="Войти" onSubmit={() => console.log('logged')} />
          <Button onClick={hasAccountToggle} size="small" sx={{ mt: 1 }}>
            Нет аккаунта?
          </Button>
        </>
      ) : (
        <>
          <Form
            formTitle="Регистрация"
            btnTitle="Создать профиль"
            onSubmit={() => console.log('registered')}
          />
          <Button onClick={hasAccountToggle} size="small" sx={{ mt: 1 }}>
            Уже есть аккаунт?
          </Button>
        </>
      )}
    </div>
  );
}
