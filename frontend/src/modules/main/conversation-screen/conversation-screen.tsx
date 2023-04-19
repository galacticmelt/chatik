import ConversationFooter from './ui-blocks/conversation-footer/conversation-footer';
import ConversationHeader from './ui-blocks/conversation-header/conversation-header';
import ConversationMain from './ui-blocks/conversation-main/conversation-main';
import { Typography, CircularProgress } from '@mui/material';
import styles from './conversation-screen.module.scss';
import { useAppSelector } from '../../../store/hooks';

export default function ConversationScreen() {
  const { chatID } = useAppSelector((state) => state.messages);
  const { user, userError, isLoading } = useAppSelector((state) => state.user);

  return (
    <div className={styles.conversationScreen}>
      {chatID ? (
        <>
          <ConversationHeader />
          <ConversationMain />
          <ConversationFooter />
        </>
      ) : isLoading ? (
        <CircularProgress size={60} />
      ) : (
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Welcome, {user.username?.split(' ')[0]}! Start messaging.
        </Typography>
      )}
    </div>
  );
}
