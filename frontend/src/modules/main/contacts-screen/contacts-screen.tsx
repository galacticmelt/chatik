import { Typography } from '@mui/material';
import ContactSearch from './ui-blocks/contact-search/contact-search';
import ContactsList from './ui-blocks/contact-list/contacts-list';
import styles from './contacts-screen.module.scss';

export default function ContactsScreen() {
  return (
    <div className={styles.contactsScreen}>
      <div className={styles.titleWrapper}>
        <Typography variant="h3">Messages</Typography>
      </div>
      <div className={styles.searchWrapper}>
        <ContactSearch />
      </div>
      <ContactsList />
    </div>
  );
}
