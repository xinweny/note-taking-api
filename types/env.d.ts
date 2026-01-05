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
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_REGION: string;
      AWS_S3_BUCKET_NAME: string;
      AWS_CLOUDFRONT_URL: string;
    }
  }
}

export {};
