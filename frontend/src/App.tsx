import { useAppSelector } from './store/hooks';
import Main from './modules/main/main';
import ErrorPage from './modules/error/error-page';
import Entry from './modules/entry/entry';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';
import './App.css';

function App() {
  const { loggedUserId } = useAppSelector((state) => state.auth);

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route
              path="/"
              errorElement={<ErrorPage />}
              element={loggedUserId ? <Main /> : <Navigate to={'/entry'} />}
            />
            <Route
              path="/entry"
              errorElement={<ErrorPage />}
              element={!loggedUserId ? <Entry /> : <Navigate to={'/'} />}
            />
          </>
        )
      )}
    />
  );
}
export default App;
