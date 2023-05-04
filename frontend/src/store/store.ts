import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import userReducer from './features/user/user.slice';
import contactsReducer from './features/contacts/contacts.slice';
import allUsersReducer from './features/allUsers/allUsers.slice';
import currentChatReducer from './features/currentChat/currentChat.slice';
import socketReducer from './features/socket/socket.slice';
import { authMiddleware } from './features/auth/auth.middleware';
import { socketMiddleware } from './features/socket/socket.middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contacts: contactsReducer,
    allUsers: allUsersReducer,
    currentChat: currentChatReducer,
    socket: socketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware, socketMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
