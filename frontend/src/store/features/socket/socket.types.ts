export type SocketState = {
  onlineUsers: SocketUser[];
  liveMessages: LiveMessage[];
};

export type SocketUser = {
  userId: string;
  socketId: string;
};

export type LiveMessage = {
  id: string;
  chatID: string;
  sender: string;
  text: string;
  createdAt: Date;
};
