import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { normalizeTime } from '../../../../../shared/helpers';
import { styled } from '@mui/material';
import styles from './message-item.module.scss';

const CardContentStyled = styled(CardContent)(`
    padding: 0;
    &:last-child {
      padding-bottom: 0;
    }
`);

interface IMessageItem {
  isCompanion: boolean;
  text: string;
  time: string;
}

export default function MessageItem({ isCompanion, text, time }: IMessageItem) {
  return (
    <div className={isCompanion ? styles.messageWrapperL : styles.messageWrapperR}>
      <div className={styles.messageItem}>
        <Card>
          <CardContentStyled sx={{ px: 1, pt: 1 }}>
            <Typography>{text}</Typography>
            <Typography variant="caption" align="right" color={'grey'}>
              {normalizeTime(time)}
            </Typography>
          </CardContentStyled>
        </Card>
      </div>
    </div>
  );
}
