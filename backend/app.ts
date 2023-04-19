import env from './src/environment.js'
import express from 'express'
import http from 'http';
import { Server }from 'socket.io'
import { connectDB } from './src/db.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
import usersRouter from './src/routes/users.routes.js'
import authRouter from './src/routes/auth.routes.js'
import chatsRouter from './src/routes/chats.routes.js'
import messagesRouter from './src/routes/messages.routes.js'
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: JSON.parse(env.allowedOrigins)
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: JSON.parse(env.allowedOrigins),
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/chats', chatsRouter)
app.use('/messages', messagesRouter)

app.use(errorHandler)

if (env.nodeEnv !== 'test') {
  connectDB()
  const port = env.port || 3000
  server.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
}

type User = {
  userId: string;
  socketId: string;
}

let users: User[] = [];

const addUser = (userId: string, socketId: string) => {
  !users.some(user => user.userId === userId) && 
    users.push({userId, socketId})
}
const removeUser = (socketId: string) => {
  const filtered = users.filter((user) => user.socketId !== socketId);
  users = filtered
}

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)

  socket.on('addUser', (userId) => {
    addUser(userId, socket.id)
    console.log(users)
    io.emit('getUsers', users)
  })
  socket.on('sendMessage', (message) => {
    console.log(message);
    io.to(message.users[0]).to(message.users[1]).emit(
      'newMessage',
      message.message
    )
  })
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
    removeUser(socket.id);
    io.emit('getUsers', users);
  })
})

export default app;



