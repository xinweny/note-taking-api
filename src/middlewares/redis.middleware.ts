import { type Request, type Response, type NextFunction } from 'express';

import { redisClient } from '../config/redis.config.ts';

export async function cache(
  getKey: (req: Request) => string
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = getKey(req);

    const cachedData = await redisClient.get(key);

    // If key is present, retrieve data from cache
    if (cachedData) {
      return res.status(200).json({
        data: JSON.parse(cachedData),
      });
    }

    // Continue to route handler
    next();
  };
}