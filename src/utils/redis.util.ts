import { redisClient } from '../config/redis.config.ts';

export async function setCache(
  key: string,
  data: any,
  expiresIn: number = 3600 // default 3600 seconds
) {
  await redisClient.set(key, JSON.stringify(data), {
    expiration: {
      type: 'EX', // specifies expiration time in seconds
      value: expiresIn,
    },
  });
}