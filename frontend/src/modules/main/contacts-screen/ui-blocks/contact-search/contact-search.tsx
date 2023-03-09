import { TextField, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ContactSearch() {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircleIcon />
          </InputAdornment>
        )
      }}
      variant="filled"
      size="small"
      placeholder="Search"
      hiddenLabel
      sx={{ width: 1 }}
    />
  );
}
