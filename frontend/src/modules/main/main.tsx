import ConversationScreen from './conversation-screen/conversation-screen';
import ContactsScreen from './contacts-screen/contacts-screen';
import styles from './main.module.scss';

export default function Main() {
  return (
    <div className={styles.main}>
      <ContactsScreen />
      <ConversationScreen />
    </div>
  );
}
