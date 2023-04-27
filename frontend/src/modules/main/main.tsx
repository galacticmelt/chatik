import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ConversationScreen from './conversation-screen/conversation-screen';
import ContactsScreen from './contacts-screen/contacts-screen';
import { userActions } from '../../store/features/user/user.slice';
import { chatsActions } from '../../store/features/chats/chats.slice';
import { socketActions } from '../../store/features/socket/socket.slice';
import { messagesActions } from '../../store/features/messages/messages.slice';
import styles from './main.module.scss';

export default function Main() {
  const { loggedUserID } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.setUser(loggedUserID));
    dispatch(chatsActions.setChats(loggedUserID));
    dispatch(socketActions.setSocket());
    dispatch(socketActions.sendUserId(loggedUserID));
    return () => {
      dispatch(socketActions.unsetSocket());
      dispatch(userActions.unsetUser());
      dispatch(chatsActions.unsetChats());
      dispatch(messagesActions.unsetCurrentChat());
      dispatch(socketActions.unsetLiveMessages());
    };
  }, []);

  return (
    <div className={styles.main}>
      <ContactsScreen />
      <ConversationScreen />
    </div>
  );
}
