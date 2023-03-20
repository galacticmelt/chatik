declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_CONNECT: string;
      PORT: string;
      ALLOWED_ORIGINS: string;
    }
  }
}

export {};