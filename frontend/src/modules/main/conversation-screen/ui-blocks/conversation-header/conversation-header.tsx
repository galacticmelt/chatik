import { useAppSelector } from '../../../../../store/hooks';
import { Avatar, IconButton, Typography } from '@mui/material';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { stringAvatar, stringToColor } from '../../../../../shared/helpers';
import styles from './conversation-header.module.scss';

export default function ConversationHeader() {
  const { companionName } = useAppSelector((state) => state.messages);

  return (
    <div className={styles.conversationHeader}>
      <div className={styles.currentContactInfo}>
        <div className={styles.avatarWrapper}>
          <Avatar sx={{ height: 1, width: 1, bgcolor: stringToColor(companionName) }}>
            {stringAvatar(companionName)}
          </Avatar>
        </div>
        <div className={styles.nameAndStatus}>
          <Typography variant="subtitle1">{companionName}</Typography>
          <Typography variant="subtitle2" color={'green'}>
            Online
          </Typography>
        </div>
      </div>
      <div className={styles.rightSideButtons}>
        <IconButton>
          <VideoCallOutlinedIcon fontSize="medium" color="success" />
        </IconButton>
        <IconButton>
          <InfoOutlinedIcon fontSize="small" color="info" />
        </IconButton>
      </div>
    </div>
  );
}
