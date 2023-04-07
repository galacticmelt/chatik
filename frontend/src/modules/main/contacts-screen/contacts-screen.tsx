import { IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactSearch from './ui-blocks/contact-search/contact-search';
import ContactsList from './ui-blocks/contact-list/contacts-list';
import { IUserPayload } from '../../../store/features/user/user.types';
import { authActions } from '../../../store/features/auth/auth.slice';
import styles from './contacts-screen.module.scss';
import { useAppDispatch } from '../../../store/hooks';

interface IContactScreenProps {
  user: IUserPayload | Record<string, never>;
}

export default function ContactsScreen({ user }: IContactScreenProps) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.contactsScreen}>
      <div className={styles.currentUser}>
        <Typography variant="h3">{user.username}</Typography>
        <IconButton onClick={() => dispatch(authActions.logOut())}>
          <LogoutIcon color="disabled" />
        </IconButton>
      </div>
      <div className={styles.searchWrapper}>
        <ContactSearch />
      </div>
      <ContactsList />
    </div>
  );
}
