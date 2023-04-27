import Main from './modules/main/main';
import ErrorPage from './modules/error/error-page';
import Entry from './modules/entry/entry';
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
          element={loggedUserID ? <Main /> : <Navigate to="/entry" />}
        />
        <Route
          path="/entry"
          errorElement={<ErrorPage />}
          element={!loggedUserID ? <Entry /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
