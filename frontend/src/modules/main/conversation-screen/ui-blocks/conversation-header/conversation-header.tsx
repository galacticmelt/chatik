import { Avatar, IconButton, Typography } from '@mui/material';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styles from './conversation-header.module.scss';

export default function ConversationHeader() {
  return (
    <div className={styles.conversationHeader}>
      <div className={styles.currentContactInfo}>
        <div className={styles.avatarWrapper}>
          <Avatar sx={{ height: 1, width: 1 }}>BB</Avatar>
        </div>
        <div className={styles.nameAndStatus}>
          <Typography variant="subtitle1">Bridge Baby</Typography>
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
