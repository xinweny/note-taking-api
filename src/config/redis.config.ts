import { createClient } from 'redis';

export const cache = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

cache.on('connect', () => {
  console.log('Connected to Redis');
});

cache.on('error', err => {
  console.log('Redis connection error:', err);
});