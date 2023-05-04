import ConversationFooter from './conversation-footer/conversation-footer';
import ConversationHeader from './conversation-header/conversation-header';
import ConversationMain from './conversation-main/conversation-main';
import { Typography, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import styles from './conversation-screen.module.scss';

export default function ConversationScreen() {
  const { chatId } = useAppSelector((state) => state.currentChat);
  const { user, userLoading } = useAppSelector((state) => state.user);

  return (
    <div className={styles.conversationScreen}>
      {chatId ? (
        <>
          <ConversationHeader />
          <ConversationMain />
          <ConversationFooter />
        </>
      ) : userLoading ? (
        <CircularProgress size={60} />
      ) : (
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Welcome, {user.username?.split(' ')[0]}! Start messaging.
        </Typography>
      )}
    </div>
  );
}
