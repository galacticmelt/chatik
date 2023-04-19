import { io } from 'socket.io-client';
import { Middleware } from 'redux';
import { socketActions } from './socket.slice';
import { Socket } from 'socket.io-client';

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    if (socketActions.setSocket.match(action)) {
      socket = io(import.meta.env.VITE_BASE_URL);
      socket.on('connect', () => {
        console.log('connected to socket server');
      });
      socket.on('getUsers', (users) => {
        console.log(users);
        store.dispatch(socketActions.setOnlineUsers(users));
      });
      socket.on('newMessage', (message) => {
        store.dispatch(socketActions.setLiveMessages(message));
      });
    }
    if (socketActions.unsetSocket.match(action)) {
      socket.disconnect();
      console.log('disconnected from socket server');
    }
    if (socketActions.sendUserId.match(action)) {
      socket.emit('addUser', action.payload);
      return;
    }
    if (socketActions.sendMessage.match(action)) {
      const { receiverId, message } = action.payload;
      socket.emit('sendMessage', {
        users: [socket.id, receiverId],
        message: message
      });
      return;
    }
    return next(action);
  };
};
