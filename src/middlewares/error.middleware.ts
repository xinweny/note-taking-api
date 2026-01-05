import { type Request, type Response, type NextFunction } from 'express';

import type { CustomError } from '../types/error.types.ts';

export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  return res.status(err.statusCode || 500).json({
    error: err.message || 'Something went wrong.',
  });
}
