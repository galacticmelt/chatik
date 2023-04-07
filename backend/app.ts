import env from './src/environment.js'
import express from 'express'
import { connectDB } from './src/db.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
import usersRouter from './src/routes/users.routes.js'
import authRouter from './src/routes/auth.routes.js'
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: JSON.parse(env.allowedOrigins),
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.use(errorHandler)

if (env.nodeEnv !== 'test') {
  connectDB()
  const port = env.port || 3000
  app.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
}

export default app;



