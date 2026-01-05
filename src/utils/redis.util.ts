import { redisClient } from '../config/redis.config.ts';

export async function checkCache(key: string) {
  const cachedData = await redisClient.get(key);

  // If key is present, retrieve data from cache
  return cachedData ? JSON.parse(cachedData) : null;
}

export async function setCache(
  key: string | undefined,
  data: any,
  expiresIn: number = 3600, // default 3600 seconds
) {
  if (!key) return;

  await redisClient.set(key, JSON.stringify(data), {
    expiration: {
      type: 'EX', // specifies expiration time in seconds
      value: expiresIn,
    },
  });
}

export async function invalidateCache(key: string) {
  return redisClient.del(key);
}
