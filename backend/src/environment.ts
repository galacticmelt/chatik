import dotenv from 'dotenv'
dotenv.config();

export default {
  port: process.env.PORT!,
  dbURL: process.env.MONGO_CONNECT!,
  nodeEnv: process.env.NODE_ENV!,
  allowedOrigins: process.env.ALLOWED_ORIGINS!,
  jwtSecret: process.env.JWT_SECRET!
}