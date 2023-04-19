import { IconButton, Typography, Skeleton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactSearch from './ui-blocks/contact-search/contact-search';
import ContactsList from './ui-blocks/contact-list/contacts-list';
import { authActions } from '../../../store/features/auth/auth.slice';
import styles from './contacts-screen.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { userActions } from '../../../store/features/user/user.slice';
import { messagesActions } from '../../../store/features/messages/messages.slice';
import { chatsActions } from '../../../store/features/chats/chats.slice';
import { socketActions } from '../../../store/features/socket/socket.slice';

export default function ContactsScreen() {
  const { user, isLoading, userError } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(authActions.logOut());
    dispatch(userActions.unsetUser());
    dispatch(chatsActions.unsetChats());
    dispatch(messagesActions.unsetCurrentChat());
    dispatch(socketActions.unsetLiveMessages());
  };

  return (
    <div className={styles.contactsScreen}>
      <div className={styles.currentUser}>
        {isLoading ? (
          <Skeleton height={50} width={300} />
        ) : (
          <Typography variant="h4">{user.username}</Typography>
        )}
        <IconButton onClick={handleLogOut} size="small">
          <LogoutIcon color="disabled" />
        </IconButton>
      </div>
      <div className={styles.searchWrapper}>
        <ContactSearch />
      </div>
      <ContactsList />
    </div>
  );
}
