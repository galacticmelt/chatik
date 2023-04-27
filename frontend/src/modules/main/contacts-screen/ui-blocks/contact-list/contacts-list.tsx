import ContactsListItem from '../contact-list-item/contacts-list-item';
import ContactsListItemSkeleton from '../contact-list-item/contacts-list-item-skeleton';
import { Typography } from '@mui/material';
import { NormalizedChat, SearchUser } from '../../../../../store/features/chats/chats.types';
import styles from './contacts-list.module.scss';
import { SocketUser } from '../../../../../store/features/socket/socket.types';

interface IContactsList {
  usersList: SearchUser[] | NormalizedChat[];
  onlineUsers: SocketUser[];
  isLoading: boolean;
  onClick: any;
}

export default function ContactsList({
  usersList,
  onlineUsers,
  isLoading,
  onClick
}: IContactsList) {
  if (!usersList.length && !isLoading) {
    return (
      <div className={styles.noChats}>
        <Typography>No chats&#129300;</Typography>
      </div>
    );
  }
  return (
    <div className={styles.contactList}>
      {isLoading ? (
        <>
          <ContactsListItemSkeleton />
          <ContactsListItemSkeleton />
          <ContactsListItemSkeleton />
          <ContactsListItemSkeleton />
        </>
      ) : (
        usersList.map((item) => {
          const user = item as SearchUser;
          const chat = item as NormalizedChat;
          return (
            <ContactsListItem
              key={chat.chatID || user._id}
              contactName={chat.companionName || user.username}
              isOnline={onlineUsers.some(
                (onlineUser) =>
                  onlineUser.userId === chat.companionID || onlineUser.userId === user._id
              )}
              lastMessage={chat.lastMessage}
              onClick={() => onClick(item)}
            />
          );
        })
      )}
    </div>
  );
}
