import { type Response } from 'express';

import { redisClient } from '../config/redis.config.ts';

export async function cacheData(options: {
  key: string,
  res: Response,
  fetchData: () => Promise<any>,
  exp: number, // in seconds
}) {
  const { key, res, fetchData, exp } = options;

  const cachedData = await redisClient.get(key);

  // If key is present, retrieve data from cache
  if (cachedData) {
    return res.status(200).json({
      data: JSON.parse(cachedData),
    });
  }

  // Otherwise, make database query
  const data = await fetchData();

  await redisClient.set(key, JSON.stringify(data), {
    expiration: {
      type: 'EX', // specifies expiration time in seconds
      value: exp,
    },
  });

  return res.status(200).json({ data });
}