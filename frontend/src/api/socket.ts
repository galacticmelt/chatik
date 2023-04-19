import { io } from 'socket.io-client';
export const connectSocket = () => {
  return io(import.meta.env.VITE_BASE_URL);
};
