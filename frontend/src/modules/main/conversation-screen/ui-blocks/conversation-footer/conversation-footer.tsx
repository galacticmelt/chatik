import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { socketActions } from '../../../../../store/features/socket/socket.slice';
import { createSocketMessage, createHistoryMessage } from '../../../../../shared/helpers';
import { messagesActions } from '../../../../../store/features/messages/messages.slice';
import { DEFAULT_VALUES } from '../../../../../shared/constants';
import { chatsActions } from '../../../../../store/features/chats/chats.slice';
import styles from './conversation-footer.module.scss';

export default function ConversationFooter() {
  const [messageText, setMessageText] = useState('');
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const { loggedUserID } = useAppSelector((state) => state.auth);
  const { chatID, companionID } = useAppSelector((state) => state.messages);

  const dispatch = useAppDispatch();

  const sendMessageHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!messageText) return;
    if (chatID === DEFAULT_VALUES.PHANTOM_CHAT_ID) {
      const { payload } = await dispatch(messagesActions.initNewChat([loggedUserID, companionID]));
      const historyMessage = createHistoryMessage(payload.chatID, loggedUserID, messageText);
      dispatch(messagesActions.sendMessage(historyMessage));
      const socketMessage = createSocketMessage(
        onlineUsers,
        payload.chatID,
        companionID,
        loggedUserID,
        messageText
      );
      dispatch(socketActions.sendMessage(socketMessage));
      dispatch(chatsActions.setChats(loggedUserID));
      setMessageText('');
      return;
    }
    const historyMessage = createHistoryMessage(chatID, loggedUserID, messageText);
    dispatch(messagesActions.sendMessage(historyMessage));
    const socketMessage = createSocketMessage(
      onlineUsers,
      chatID,
      companionID,
      loggedUserID,
      messageText
    );
    dispatch(socketActions.sendMessage(socketMessage));
    setMessageText('');
  };

  return (
    <div className={styles.conversationFooter}>
      <div className={styles.attachmentWrapper}>
        <IconButton sx={{ p: 0 }}>
          <InsertEmoticonIcon />
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
