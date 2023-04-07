import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import userReducer from './features/user/user.slice';
import { authMiddleware } from './features/auth/auth.middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
