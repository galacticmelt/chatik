import { Skeleton } from '@mui/material';
import styles from './contacts-list-item.module.scss';

export default function ContactsListItemSkeleton() {
  return (
    <div className={styles.contactsListItem}>
      <div className={styles.avatarWrapper}>
        <Skeleton variant="circular" sx={{ height: 1, width: 1 }} />
      </div>
      <div className={styles.nameAndLastMessage}>
        <Skeleton height={28} />
        <Skeleton height={28} />
      </div>
    </div>
  );
}
