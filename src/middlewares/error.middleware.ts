import { type Request, type Response, type NextFunction } from 'express';

import { CustomError } from '../errors/custom-error.ts';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  return err instanceof CustomError
    ? res.status(err.statusCode).json(err.serialize())
    : res.status(500).json({
        message: 'Something went wrong.',
      });
}
