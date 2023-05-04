import { IconButton, Typography, Skeleton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchInput from './search-input/search-input';
import ContactsList from './contacts-list/contacts-list';
import UsersList from './users-list/users-list';
import ListToggle from './list-toggle/list-toggle';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useState } from 'react';
import { currentChatActions } from '../../../store/features/currentChat/currentChat.slice';
import { allUsersActions } from '../../../store/features/allUsers/allUsers.slice';
import { authActions } from '../../../store/features/auth/auth.slice';
import { socketActions } from '../../../store/features/socket/socket.slice';
import { Contact } from '../../../store/features/contacts/contacts.types';
import { User } from '../../../shared/types';
import { DEFAULT_VALUES } from '../../../shared/constants';
import styles from './contacts-screen.module.scss';

export default function ContactsScreen() {
  const { loggedUserId } = useAppSelector((state) => state.auth);
  const { user, userLoading } = useAppSelector((state) => state.user);
  const { contacts, contactsLoading } = useAppSelector((state) => state.contacts);
  const { allUsers, allUsersLoading } = useAppSelector((state) => state.allUsers);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();

  const [togglePosition, setTogglePosition] = useState('contacts');

  const handleToggle = (e: React.MouseEvent<HTMLElement>, value: string) => {
    if (value !== null) {
      setTogglePosition(value);
    }
    if (value === 'allUsers') {
      dispatch(allUsersActions.setAllUsers());
    }
  };

  const handleLogOut = () => {
    dispatch(authActions.logOut());
  };

  const startChatFromContacts = (contact: Contact) => {
    dispatch(currentChatActions.setCurrentChat(contact));
    dispatch(currentChatActions.setMessages(contact.chatId));
    dispatch(socketActions.unsetLiveMessages());
  };

  const startChatFromAllUsers = (user: User) => {
    console.log(user);
    const isContact = contacts.find((contact) => contact.contactId === user._id);
    if (isContact) {
      dispatch(currentChatActions.setCurrentChat(isContact));
      dispatch(currentChatActions.setMessages(isContact.chatId));
      dispatch(socketActions.unsetLiveMessages());
      return;
    }
    dispatch(
      currentChatActions.setCurrentChat({
        chatId: DEFAULT_VALUES.MOCK_ID_FOR_CHAT_INIT,
        contactId: user._id,
        contactName: user.username
      })
    );
    dispatch(currentChatActions.setMessages(DEFAULT_VALUES.MOCK_ID_FOR_CHAT_INIT));
  };

  return (
    <div className={styles.contactsScreen}>
      <div className={styles.currentUser}>
        {userLoading ? (
          <Skeleton height={50} width={300} />
        ) : (
          <Typography variant="h4">{user.username}</Typography>
        )}
        <Tooltip title="Log out" arrow>
          <IconButton onClick={handleLogOut} size="small">
            <LogoutIcon color="disabled" />
          </IconButton>
        </Tooltip>
      </div>
      <div className={styles.searchWrapper}>
        <SearchInput />
        <ListToggle togglePosition={togglePosition} onChange={handleToggle} />
      </div>
      {togglePosition === 'contacts' ? (
        <ContactsList
          loggedUserId={loggedUserId}
          contactsList={contacts}
          onlineUsers={onlineUsers}
          contactsLoading={contactsLoading}
          onClick={startChatFromContacts}
        />
      ) : (
        <UsersList
          usersList={allUsers.filter((user) => user._id !== loggedUserId)}
          onlineUsers={onlineUsers}
          usersLoading={allUsersLoading}
          onClick={startChatFromAllUsers}
        />
      )}
    </div>
  );
}
