import { Typography } from '@mui/material';
import ListAvatar from '../list-avatar/list-avatar';
import styles from './users-list-item.module.scss';

interface UsersListItemProps {
  userName: string;
  isOnline: boolean;
  onClick: React.MouseEventHandler;
}

export default function UsersListItem({ userName, isOnline, onClick }: UsersListItemProps) {
  return (
    <div className={styles.usersListItem} onClick={onClick}>
      <div className={styles.avatarWrapper}>
        <ListAvatar name={userName} isOnline={isOnline} />
      </div>
      <div className={styles.userName}>
        <Typography variant="subtitle1" textOverflow="ellipsis">
          {userName}
        </Typography>
      </div>
    </div>
  );
}
