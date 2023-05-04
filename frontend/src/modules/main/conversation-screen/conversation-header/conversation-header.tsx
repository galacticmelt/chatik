import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useMenu } from '../../shared/hooks';
import { Avatar, IconButton, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { contactsActions } from '../../../../store/features/contacts/contacts.slice';
import { currentChatActions } from '../../../../store/features/currentChat/currentChat.slice';
import { stringAvatar, stringToColor } from '../../shared/helpers';
import { socketActions } from '../../../../store/features/socket/socket.slice';
import styles from './conversation-header.module.scss';
import HeaderMenu from '../header-menu/header-menu';

export default function ConversationHeader() {
  const { companionName, companionId, chatId } = useAppSelector((state) => state.currentChat);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();

  const { open, anchorEl, anchorHandler, closeHandler } = useMenu();

  const deleteContactHandler = () => {
    dispatch(currentChatActions.unsetCurrentChat());
    dispatch(contactsActions.deleteContact(chatId)).then(() => {
      dispatch(contactsActions.unsetOneContact(chatId));
      dispatch(socketActions.notifyAboutContactsUpd({ updateType: 'delete', companionId }));
    });
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
          {onlineUsers.find((user) => user.userId === companionId) ? (
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
        <IconButton onClick={anchorHandler}>
          <MoreHorizIcon fontSize="medium" color="success" />
        </IconButton>
        <HeaderMenu
          anchorEl={anchorEl}
          closeHandler={closeHandler}
          open={open}
          options={[{ name: 'Delete this conversation', handler: deleteContactHandler }]}
        />
      </div>
    </div>
  );
}
