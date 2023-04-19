import { useAppSelector } from '../../../../../store/hooks';
import { Typography } from '@mui/material';
import MessageItem from '../message-item/message-item';
import styles from './conversation-main.module.scss';

export default function ConversationMain() {
  const { loggedUserID } = useAppSelector((state) => state.auth);
  const { messages, chatID } = useAppSelector((state) => state.messages);
  const { liveMessages } = useAppSelector((state) => state.socket);

  if (!messages.length && !liveMessages.filter((message) => message.chatID === chatID).length) {
    return (
      <div className={styles.noMessages}>
        <Typography variant="h6">No messages yet &#129296;</Typography>
      </div>
    );
  }
  return (
    <div className={styles.conversationMain}>
      {liveMessages.length > 0 &&
        liveMessages
          .filter((message) => message.chatID === chatID)
          .map((message) => {
            const isCompanion = message.sender !== loggedUserID;
            return (
              <MessageItem
                key={message.id}
                isCompanion={isCompanion}
                text={message.text}
                time={message.createdAt}
              />
            );
          })}
      {messages.length > 0 &&
        messages.map((message) => {
          const isCompanion = message.sender !== loggedUserID;
          return (
            <MessageItem
              key={message._id}
              isCompanion={isCompanion}
              text={message.text}
              time={message.createdAt}
            />
          );
        })}
    </div>
  );
}
