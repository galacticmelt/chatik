import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import styles from './contacts-list-item.module.scss';

interface IContactsList {
  initials: string;
  name: string;
}

export default function ContactsListItem({ initials, name }: IContactsList) {
  return (
    <div className={styles.contactsListItem}>
      <div className={styles.avatarWrapper}>
        <Avatar sx={{ height: 1, width: 1, bgcolor: deepOrange[600] }}>{initials}</Avatar>
      </div>
      <div className={styles.contactNameAndStatus}>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="subtitle1" color={'grey'}>
          last message...
        </Typography>
      </div>
    </div>
  );
}
