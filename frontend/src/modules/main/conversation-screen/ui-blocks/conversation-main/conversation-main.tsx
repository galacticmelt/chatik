import MessageItem from '../message-item/message-item';
import styles from './conversation-main.module.scss';

export default function ConversationMain() {
  return (
    <div className={styles.conversationMain}>
      <MessageItem text="Why isn't it possibe for you to just simply fucking respond, it is not big deal and you know that" />
      <MessageItem text="Pablo please say something you stupid bastard" />
      <MessageItem text="Pablo, Honey?" />
      <MessageItem text="Why are you silent?" />
      <MessageItem text="Hey how are you doing honey?" />
    </div>
  );
}
