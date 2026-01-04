declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      DATABASE_HOST: string;
      DATABASE_PORT: number;
      DATABASE_NAME: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      JWT_ACCESS_TOKEN_SECRET: string;
      JWT_ACCESS_TOKEN_EXPIRES_IN: number;
      JWT_REFRESH_TOKEN_SECRET: string;
      JWT_REFRESH_TOKEN_EXPIRES_IN: number;
      REDIS_URL: string;
      REDIS_PASSWORD: string;
    }
  }
}

export {}