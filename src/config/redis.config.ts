import { createClient } from 'redis';

export const cache = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

cache.on('error', err => {
  console.log('Redis Client Error', err);
});