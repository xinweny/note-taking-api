import {
  createClient,
  type RedisClientType,
} from 'redis';

const cache: RedisClientType = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

cache.on('error', err => {
  console.log(`Redis: ${err}`);
});

export { cache };