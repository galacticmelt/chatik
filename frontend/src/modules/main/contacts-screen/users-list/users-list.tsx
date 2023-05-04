import UsersListItem from '../users-list-item/users-list-item';
import UsersListItemSkeleton from '../users-list-item/users-list-item-skeleton';
import { Typography } from '@mui/material';
import { User } from '../../../../shared/types';
import { SocketUser } from '../../../../store/features/socket/socket.types';
import { tenElemsMockArray } from '../../shared/constants';
import styles from './users-list.module.scss';

interface UsersListProps {
  usersList: User[];
  usersLoading: boolean;
  onlineUsers: SocketUser[];
  onClick: (user: User) => void;
}

export default function UsersList({
  usersList,
  usersLoading,
  onlineUsers,
  onClick
}: UsersListProps) {
  if (!usersList.length && !usersLoading) {
    return (
      <div className={styles.noUsers}>
        <Typography>Where&apos;s everybody gone?&#129300;</Typography>
      </div>
    );
  }
  return (
    <div className={usersLoading ? styles.usersList : `${styles.usersList} ${styles.scrollable}`}>
      {usersLoading ? (
        <>
          {tenElemsMockArray.map((elem) => {
            return <UsersListItemSkeleton key={elem} />;
          })}
        </>
      ) : (
        usersList.map((user) => {
          return (
            <UsersListItem
              key={user._id}
              userName={user.username}
              isOnline={onlineUsers.some((onlineUser) => onlineUser.userId === user._id)}
              onClick={() => onClick(user)}
            />
          );
        })
      )}
    </div>
  );
}
