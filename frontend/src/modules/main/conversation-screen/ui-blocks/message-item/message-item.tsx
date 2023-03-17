import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { styled } from '@mui/material';
import styles from './message-item.module.scss';

const CardContentStyled = styled(CardContent)(`
    padding: 0;
    &:last-child {
      padding-bottom: 0;
    }
`);

interface IMessageItem {
  text: string;
}

export default function MessageItem({ text }: IMessageItem) {
  return (
    <div className={styles.messageItem}>
      <Card>
        <CardContentStyled sx={{ px: 1, pt: 1 }}>
          <Typography>{text}</Typography>
          <Typography variant="subtitle2" align="right" color={'grey'}>
            4:20
          </Typography>
        </CardContentStyled>
      </Card>
    </div>
  );
}
