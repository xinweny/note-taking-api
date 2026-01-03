import { createClient } from 'redis';

const cache = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

cache.on('error', err => {
  console.log('Redis Client Error', err);
});

export { cache };