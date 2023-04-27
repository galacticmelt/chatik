import { useState } from 'react';
import { useAppSelector } from '../../../../../store/hooks';
import { Avatar, IconButton, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { stringAvatar, stringToColor } from '../../../../../shared/helpers';
import styles from './conversation-header.module.scss';

export default function ConversationHeader() {
  const { companionName, companionID } = useAppSelector((state) => state.messages);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

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
          {onlineUsers.find((user) => user.userId === companionID) ? (
            <Typography variant="subtitle2" color="green">
              Online
            </Typography>
          ) : (
            <Typography variant="subtitle2" color="gray">
              Offline
            </Typography>
          )}
        </div>
      </div>
      <div className={styles.rightSideButtons}>
        <IconButton onClick={clickHandler}>
          <MoreHorizIcon fontSize="medium" color="success" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClick={closeHandler}
          onClose={closeHandler}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
        >
          <MenuItem>
            <DeleteIcon color='disabled' sx={{mr: 0.5}}/>
            <Typography variant="subtitle2">Delete this conversation</Typography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
