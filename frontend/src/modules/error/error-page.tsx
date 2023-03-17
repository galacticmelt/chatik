import { useRouteError } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Typography variant="h1">Whoopsie!</Typography>
      <Typography variant="subtitle1">{error.statusText || error.message}</Typography>
    </div>
  );
}
