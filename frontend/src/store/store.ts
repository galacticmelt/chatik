import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import userReducer from './features/user/user.slice';
import chatsReducer from './features/chats/chats.slice';
import messagesReducer from './features/messages/messages.slice';
import socketReducer from './features/socket/socket.slice';
import { authMiddleware } from './features/auth/auth.middleware';
import { socketMiddleware } from './features/socket/socket.middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    socket: socketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware, socketMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
