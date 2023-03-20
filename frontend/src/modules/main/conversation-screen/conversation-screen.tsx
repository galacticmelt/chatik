import ConversationFooter from './ui-blocks/conversation-footer/conversation-footer';
import ConversationHeader from './ui-blocks/conversation-header/conversation-header';
import ConversationMain from './ui-blocks/conversation-main/conversation-main';
import styles from './conversation-screen.module.scss';

export default function ConversationScreen() {
  return (
    <div className={styles.conversationScreen}>
      <ConversationHeader />
      <ConversationMain />
      <ConversationFooter />
    </div>
  );
}
