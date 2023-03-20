import React from 'react';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import styles from './conversation-footer.module.scss';

export default function ConversationFooter() {
  return (
    <div className={styles.conversationFooter}>
      <div className={styles.attachmentWrapper}>
        <IconButton sx={{ p: 0 }}>
          <AttachmentOutlinedIcon />
        </IconButton>
      </div>
      <TextField
        className={styles.messageForm}
        placeholder="Type your message here"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <SendRoundedIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}
