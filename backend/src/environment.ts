import dotenv from 'dotenv'
dotenv.config();

export default {
  port: process.env.PORT!,
  dbURL: process.env.MONGO_CONNECT!,
  nodeEnv: process.env.NODE_ENV!,
  allowedOrigins: process.env.ALLOWED_ORIGINS!,
  jwtAccessSign: process.env.JWT_ACCESS_SIGN!,
  jwtRefreshSign: process.env.JWT_REFRESH_SIGN!,
}