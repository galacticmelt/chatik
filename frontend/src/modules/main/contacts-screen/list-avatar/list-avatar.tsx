import { Avatar, styled } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { stringAvatar, stringToColor } from '../../shared/helpers';
import styles from './list-avatar.module.scss';

interface ListAvatarProps {
  name: string;
  isOnline: boolean;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }
}));

export default function ListAvatar({ name, isOnline }: ListAvatarProps) {
  if (!isOnline) {
    return (
      <Avatar sx={{ height: 1, minWidth: 1, bgcolor: stringToColor(name) }}>
        {stringAvatar(name)}
      </Avatar>
    );
  }
  return (
    <div className={styles.avatarWrapper}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        sx={{ height: 1, width: 1 }}
      >
        <Avatar sx={{ height: 1, width: 1, bgcolor: stringToColor(name) }}>
          {stringAvatar(name)}
        </Avatar>
      </StyledBadge>
    </div>
  );
}
