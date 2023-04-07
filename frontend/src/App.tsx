import Main from './modules/main/main';
import ErrorPage from './modules/error/error-page';
import Auth from './modules/auth/auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';

function App() {
  const { loggedUserID } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          errorElement={<ErrorPage />}
          element={loggedUserID ? <Main /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          errorElement={<ErrorPage />}
          element={!loggedUserID ? <Auth /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
