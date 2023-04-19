import { Skeleton } from '@mui/material';
import styles from './contacts-list-item.module.scss';

export default function ContactsListItemSkeleton() {
  return (
    <div className={styles.contactsListItem}>
      <div className={styles.avatarWrapper}>
        <Skeleton variant="circular" sx={{ height: 1, width: 1 }} />
      </div>
      <div className={styles.contactNameAndStatus}>
        <Skeleton width={200} height={28} />
        <Skeleton width={200} height={28} />
      </div>
    </div>
  );
}
