import { Typography } from '@mui/material';
import ContactAvatar from '../contact-avatar/contact-avatar';
import { IncomingHistoryMessage } from '../../../../../store/features/messages/messages.types';
import { normalizeTime } from '../../../../../shared/helpers';
import styles from './contacts-list-item.module.scss';

interface IContactsListItem {
  contactName: string;
  isOnline: boolean;
  lastMessage: IncomingHistoryMessage;
  onClick: React.MouseEventHandler;
}

export default function ContactsListItem({
  contactName,
  isOnline,
  lastMessage,
  onClick
}: IContactsListItem) {
  return (
    <div className={styles.contactsListItem} onClick={onClick}>
      <ContactAvatar name={contactName} isOnline={isOnline} />
      <div className={styles.nameAndLastMessage}>
        <Typography variant="subtitle1" textOverflow="ellipsis">
          {contactName}
        </Typography>
        <div className={styles.messageAndTime}>
          <Typography variant="subtitle1" color={'grey'}>
            {lastMessage?.text || ''}
          </Typography>
          <Typography variant="caption" color={'grey'} sx={{ alignSelf: 'flex-end' }}>
            {lastMessage ? normalizeTime(lastMessage?.createdAt) : ''}
          </Typography>
        </div>
      </div>
    </div>
  );
}
