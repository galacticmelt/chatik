import { IconButton, Typography, Skeleton, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactSearch from './ui-blocks/contact-search/contact-search';
import ContactsList from './ui-blocks/contact-list/contacts-list';
import { authActions } from '../../../store/features/auth/auth.slice';
import styles from './contacts-screen.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useState } from 'react';
import { messagesActions } from '../../../store/features/messages/messages.slice';
import { chatsActions } from '../../../store/features/chats/chats.slice';
import { NormalizedChat, SearchUser } from '../../../store/features/chats/chats.types';
import { DEFAULT_VALUES } from '../../../shared/constants';
import { styled } from '@mui/material/styles';
import { socketActions } from '../../../store/features/socket/socket.slice';

const StyledToggleButton = styled(ToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#1976d2',
    backgroundColor: 'white'
  },
  '&.Mui-selected': {
    border: 100,
    borderColor: 'lightgrey'
  }
});

export default function ContactsScreen() {
  const { user, userLoading } = useAppSelector((state) => state.user);
  const [togglePosition, setTogglePosition] = useState('myChats');
  const { chats, allUsers, isLoading } = useAppSelector((state) => state.chats);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(authActions.logOut());
  };

  const handleToggle = (e: React.MouseEvent<HTMLElement>, value: string) => {
    if (value !== null) {
      setTogglePosition(value);
    }
    if (value === 'allUsers') {
      dispatch(chatsActions.setAllUsers());
    }
  };

  const loadMessagesHandler = (chat: NormalizedChat) => {
    dispatch(messagesActions.setCurrentChat(chat));
    dispatch(messagesActions.setMessages(chat.chatID));
    dispatch(socketActions.unsetLiveMessages());
  };

  const initiateChatHandler = (user: SearchUser) => {
    const chatExists = chats.find((chat) => chat.companionID === user._id);
    if (chatExists) {
      dispatch(messagesActions.setCurrentChat(chatExists));
      dispatch(messagesActions.setMessages(chatExists.chatID));
      dispatch(socketActions.unsetLiveMessages());
      return;
    }
    dispatch(
      messagesActions.setCurrentChat({
        chatID: DEFAULT_VALUES.PHANTOM_CHAT_ID,
        companionID: user._id,
        companionName: user.username
      })
    );
    dispatch(messagesActions.setMessages(DEFAULT_VALUES.PHANTOM_CHAT_ID));
  };

  return (
    <div className={styles.contactsScreen}>
      <div className={styles.currentUser}>
        {userLoading ? (
          <Skeleton height={50} width={300} />
        ) : (
          <Typography variant="h4">{user.username}</Typography>
        )}
        <Tooltip title='Log out' arrow>
          <IconButton onClick={handleLogOut} size="small">
            <LogoutIcon color="disabled" />
          </IconButton>
        </Tooltip>
      </div>
      <div className={styles.searchWrapper}>
        <ContactSearch />
        <ToggleButtonGroup
          value={togglePosition}
          onChange={handleToggle}
          exclusive
          color="primary"
          sx={{ width: 1 }}
        >
          <StyledToggleButton value="allUsers" disableRipple sx={{ width: 0.5, border: 0 }}>
            All users
          </StyledToggleButton>
          <StyledToggleButton value="myChats" disableRipple sx={{ width: 0.5, border: 0 }}>
            My chats
          </StyledToggleButton>
        </ToggleButtonGroup>
      </div>
      {togglePosition === 'myChats' ? (
        <ContactsList
          usersList={chats}
          onlineUsers={onlineUsers}
          isLoading={isLoading}
          onClick={loadMessagesHandler}
        />
      ) : (
        <ContactsList
          usersList={allUsers}
          onlineUsers={onlineUsers}
          isLoading={isLoading}
          onClick={initiateChatHandler}
        />
      )}
    </div>
  );
}
