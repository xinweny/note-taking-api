import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtUserPayload } from 'jsonwebtoken';

import { AuthenticationError } from '../errors/authentication-error.ts';

import { getUserById } from '../services/user.service.ts';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) throw new AuthenticationError();

  const accessToken = req.headers.authorization.split(' ')[1];

  if (!accessToken) throw new AuthenticationError();

  try {
    const payload = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET,
    ) as JwtUserPayload;

    if (!payload) throw new AuthenticationError();

    const user = await getUserById(payload.id);

    if (!user) throw new AuthenticationError();

    req.user = { id: user.id };

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      throw new AuthenticationError('Access token expired');
  }
}
