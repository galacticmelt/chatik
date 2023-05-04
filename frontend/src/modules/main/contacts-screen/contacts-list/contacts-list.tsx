import ContactsListItem from '../contacts-list-item/contacts-list-item';
import ContactsListItemSkeleton from '../contacts-list-item/contacts-list-item-skeleton';
import { Typography } from '@mui/material';
import { Contact } from '../../../../store/features/contacts/contacts.types';
import { SocketUser } from '../../../../store/features/socket/socket.types';
import { tenElemsMockArray } from '../../shared/constants';
import styles from './contacts-list.module.scss';

interface ContactsListProps {
  contactsList: Contact[];
  onlineUsers: SocketUser[];
  contactsLoading: boolean;
  loggedUserId: string;
  onClick: (contact: Contact) => void;
}

export default function ContactsList({
  contactsList,
  onlineUsers,
  contactsLoading,
  loggedUserId,
  onClick
}: ContactsListProps) {
  if (!contactsList.length && !contactsLoading) {
    return (
      <div className={styles.noContacts}>
        <Typography>No contacts&#129300;</Typography>
      </div>
    );
  }
  return (
    <div className={styles.contactList}>
      {contactsLoading ? (
        <>
          {tenElemsMockArray.map((elem) => {
            return <ContactsListItemSkeleton key={elem} />;
          })}
        </>
      ) : (
        contactsList
          .filter((contact) => contact.lastMessage)
          .sort(
            (a, b) =>
              new Date(b.lastMessage.createdAt).valueOf() -
              new Date(a.lastMessage.createdAt).valueOf()
          )
          .concat(contactsList.filter((contact) => !contact.lastMessage))
          .map((contact) => {
            return (
              <ContactsListItem
                key={contact.chatId}
                loggedUserId={loggedUserId}
                contactName={contact.contactName}
                isOnline={onlineUsers.some((onlineUser) => onlineUser.userId === contact.contactId)}
                lastMessage={contact.lastMessage}
                onClick={() => onClick(contact)}
              />
            );
          })
      )}
    </div>
  );
}
