import Main from './modules/main/main';
import ErrorPage from './modules/error/error-page';
import Auth from './modules/auth/auth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />
  },
  {
    path: '/auth',
    element: <Auth />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
