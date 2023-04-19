import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { socketActions } from '../../../../../store/features/socket/socket.slice';
import { createSocketMessage, createHistoryMessage } from '../../../../../shared/helpers';
import styles from './conversation-footer.module.scss';
import { messagesActions } from '../../../../../store/features/messages/messages.slice';

export default function ConversationFooter() {
  const [messageText, setMessageText] = useState('');
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const { loggedUserID } = useAppSelector((state) => state.auth);
  const { chatID, companionID } = useAppSelector((state) => state.messages);

  const dispatch = useAppDispatch();

  const sendMessageHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!messageText) return;
    const socketMessage = createSocketMessage(
      onlineUsers,
      chatID,
      companionID,
      loggedUserID,
      messageText
    );
    dispatch(socketActions.sendMessage(socketMessage));
    const historyMessage = createHistoryMessage(chatID, loggedUserID, messageText);
    dispatch(messagesActions.sendMessage(historyMessage));
    setMessageText('');
  };

  return (
    <div className={styles.conversationFooter}>
      <div className={styles.attachmentWrapper}>
        <IconButton sx={{ p: 0 }}>
          <AttachmentOutlinedIcon />
        </IconButton>
      </div>
      <form className={styles.messageForm} onSubmit={sendMessageHandler}>
        <TextField
          className={styles.messageInput}
          placeholder="Type your message here"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={sendMessageHandler}>
                <IconButton edge="end">
                  <SendRoundedIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          value={messageText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
        />
      </form>
    </div>
  );
}
