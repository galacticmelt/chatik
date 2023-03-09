import ContactsListItem from '../contact-list-item/contacts-list-item';
import styles from './contacts-list.module.scss';

export default function ContactsList() {
  return (
    <div className={styles.contactList}>
      <ContactsListItem initials="BB" name="Bridge Baby" />
      <ContactsListItem initials="II" name="Isaac Ivory" />
      <ContactsListItem initials="TT" name="Thom Thunder" />
      <ContactsListItem initials="CC" name="Christine Canvas" />
      <ContactsListItem initials="HH" name="Haley Human" />
    </div>
  );
}
