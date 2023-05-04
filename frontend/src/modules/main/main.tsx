import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ConversationScreen from './conversation-screen/conversation-screen';
import ContactsScreen from './contacts-screen/contacts-screen';
import { userActions } from '../../store/features/user/user.slice';
import { contactsActions } from '../../store/features/contacts/contacts.slice';
import { allUsersActions } from '../../store/features/allUsers/allUsers.slice';
import { socketActions } from '../../store/features/socket/socket.slice';
import { currentChatActions } from '../../store/features/currentChat/currentChat.slice';
import styles from './main.module.scss';

export default function Main() {
  const { loggedUserId } = useAppSelector((state) => state.auth);
  const { allUsersError } = useAppSelector((state) => state.allUsers);
  const { contactsError } = useAppSelector((state) => state.contacts);
  const { initNewChatError, messagesError } = useAppSelector((state) => state.currentChat);
  const { userError } = useAppSelector((state) => state.user);

  const errors = [allUsersError, contactsError, initNewChatError, messagesError, userError];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.setUser(loggedUserId));
    dispatch(contactsActions.setContacts(loggedUserId));
    dispatch(socketActions.setSocket());
    dispatch(socketActions.sendUserId(loggedUserId));
    return () => {
      console.log('main unmounted');
      dispatch(socketActions.unsetSocket());
      dispatch(userActions.unsetUser());
      dispatch(contactsActions.unsetContacts());
      dispatch(allUsersActions.unsetAllUsers());
      dispatch(currentChatActions.unsetCurrentChat());
      dispatch(socketActions.unsetLiveMessages());
    };
  }, []);

  useEffect(() => {
    if (errors.some((err) => err.status)) {
      const caughtError = errors.find((err) => err.status);
      throw new Error(caughtError?.value);
    }
  }, [errors]);

  return (
    <div className={styles.main}>
      <ContactsScreen />
      <ConversationScreen />
    </div>
  );
}
