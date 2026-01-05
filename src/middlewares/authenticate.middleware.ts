import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtUserPayload } from 'jsonwebtoken';

import { AuthenticationError } from '../errors/authentication-error.ts';

import { User } from '../models/index.ts';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) throw new AuthenticationError();

  const accessToken = req.headers.authorization.split(' ')[1];

  if (!accessToken) throw new AuthenticationError();

  const payload = jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_TOKEN_SECRET,
  ) as JwtUserPayload;

  const user = payload && (await User.findByPk(payload.id));

  if (!user) throw new AuthenticationError();
  req.user = { id: user.id };

  next();
}
