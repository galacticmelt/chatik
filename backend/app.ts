import env from './src/environment.js'
import express from 'express'
import { connectDB } from './src/db.js'
import cors from 'cors'
import usersRouter from './src/routes/users.route.js'
import authRouter from './src/routes/auth.route.js'

const app = express()

app.use(express.json());
app.use(cors({
  origin: JSON.parse(env.allowedOrigins),
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/users', usersRouter)
app.use('/auth', authRouter)

if (env.nodeEnv !== 'test') {
  connectDB()
  const port = env.port || 3000
  app.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
}

export default app;



