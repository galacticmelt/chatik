import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ConversationScreen from './conversation-screen/conversation-screen';
import ContactsScreen from './contacts-screen/contacts-screen';
import { userActions } from '../../store/features/user/user.slice';
import styles from './main.module.scss';
import { Typography } from '@mui/material';

export default function Main() {
  const { loggedUserID } = useAppSelector((state) => state.auth);
  const { user, error } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    loggedUserID && dispatch(userActions.setUser(loggedUserID));
  }, [loggedUserID]);

  if (error.status) {
    return <Typography>Error: {error.value}</Typography>;
  }
  return (
    <div className={styles.main}>
      <ContactsScreen user={user} />
      <ConversationScreen />
    </div>
  );
}
