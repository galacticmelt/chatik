import { Typography } from '@mui/material';
import ListAvatar from '../list-avatar/list-avatar';
import { IncomingHistoryMessage } from '../../../../store/features/currentChat/currentChat.types';
import { normalizeLastMessageTime, prepareLastMessage } from '../../shared/helpers';
import styles from './contacts-list-item.module.scss';

interface ContactsListItemProps {
  contactName: string;
  isOnline: boolean;
  lastMessage: IncomingHistoryMessage;
  loggedUserId: string;
  onClick: React.MouseEventHandler;
}

export default function ContactsListItem({
  contactName,
  isOnline,
  lastMessage,
  loggedUserId,
  onClick
}: ContactsListItemProps) {
  return (
    <div className={styles.contactsListItem} onClick={onClick}>
      <div className={styles.avatarWrapper}>
        <ListAvatar name={contactName} isOnline={isOnline} />
      </div>
      <div className={styles.nameAndLastMessage}>
        <div className={styles.nameAndTime}>
          <Typography variant="subtitle1" textOverflow="ellipsis">
            {contactName}
          </Typography>
          <Typography variant="caption" color={'grey'} sx={{ alignSelf: 'flex-start' }}>
            {lastMessage ? normalizeLastMessageTime(lastMessage?.createdAt) : ''}
          </Typography>
        </div>
        <Typography
          variant="subtitle1"
          color={'grey'}
          sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          {lastMessage ? prepareLastMessage(loggedUserId, lastMessage) : ''}
        </Typography>
      </div>
    </div>
  );
}
