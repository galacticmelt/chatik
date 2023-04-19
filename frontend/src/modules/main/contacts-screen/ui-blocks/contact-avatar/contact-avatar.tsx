import { Avatar, styled } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { stringAvatar, stringToColor } from '../../../../../shared/helpers';
import styles from './contact-avatar.module.scss';

interface IContactAvatarProps {
  name: string;
  isOnline: boolean;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }
}));

export default function ContactAvatar({ name, isOnline }: IContactAvatarProps) {
  if (!isOnline) {
    return (
      <div className={styles.avatarWrapper}>
        <Avatar sx={{ height: 1, width: 1, bgcolor: stringToColor(name) }}>
          {stringAvatar(name)}
        </Avatar>
      </div>
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
