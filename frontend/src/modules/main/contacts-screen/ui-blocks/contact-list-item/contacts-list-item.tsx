import { Typography } from '@mui/material';
import ContactAvatar from '../contact-avatar/contact-avatar';
import styles from './contacts-list-item.module.scss';

interface IContactsListItem {
  companionName: string;
  isOnline: boolean;
  onClick: React.MouseEventHandler;
}

export default function ContactsListItem({ companionName, isOnline, onClick }: IContactsListItem) {
  return (
    <div className={styles.contactsListItem} onClick={onClick}>
      <ContactAvatar name={companionName} isOnline={isOnline} />
      <div className={styles.contactNameAndStatus}>
        <Typography variant="subtitle1" textOverflow="ellipsis">
          {companionName}
        </Typography>
        <Typography variant="subtitle1" color={'grey'}>
          last message...
        </Typography>
      </div>
    </div>
  );
}
