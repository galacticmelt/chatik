import { FormControl, TextField, Typography, Button } from '@mui/material';
import styles from './form.module.scss';

interface IFormProps {
  formTitle: string;
  btnTitle: string;
  onSubmit: React.FormEventHandler;
}

const Form: React.FC<IFormProps> = ({ formTitle, btnTitle, onSubmit }: IFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <FormControl className={styles.formControl}>
        <Typography variant="h2">{formTitle}</Typography>
        <TextField label="Email" size="small" fullWidth={true} />
        <TextField label="Password" size="small" type={'password'} fullWidth={true} />
        <Button variant="contained">{btnTitle}</Button>
      </FormControl>
    </form>
  );
};

export default Form;
