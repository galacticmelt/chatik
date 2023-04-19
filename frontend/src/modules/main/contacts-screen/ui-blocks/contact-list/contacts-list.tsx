import ContactsListItem from '../contact-list-item/contacts-list-item';
import ContactsListItemSkeleton from '../contact-list-item/contacts-list-item-skeleton';
import { Typography } from '@mui/material';
import { messagesActions } from '../../../../../store/features/messages/messages.slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { NormalizedChat } from '../../../../../store/features/chats/chats.types';
import styles from './contacts-list.module.scss';

export default function ContactsList() {
  const dispatch = useAppDispatch();
  const { chats, chatsError, isLoading } = useAppSelector((state) => state.chats);
  const { onlineUsers } = useAppSelector((state) => state.socket);

  const loadMessagesHandler = (chat: NormalizedChat) => {
    dispatch(messagesActions.setCurrentChat(chat));
    dispatch(messagesActions.setMessages(chat.chatID));
  };

  if (chatsError.status) {
    return <Typography>Error: {chatsError.value}</Typography>;
  }
  return (
    <div className={styles.contactList}>
      {isLoading ? (
        <>
          <ContactsListItemSkeleton />
          <ContactsListItemSkeleton />
          <ContactsListItemSkeleton />
          <ContactsListItemSkeleton />
          <ContactsListItemSkeleton />
          <ContactsListItemSkeleton />
          <ContactsListItemSkeleton />
        </>
      ) : (
        chats.map((chat) => {
          return (
            <ContactsListItem
              key={chat.chatID}
              companionName={chat.companionName}
              isOnline={onlineUsers.some((user) => user.userId === chat.companionID)}
              onClick={() => loadMessagesHandler(chat)}
            />
          );
        })
      )}
    </div>
  );
}
