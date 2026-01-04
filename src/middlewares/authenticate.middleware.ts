import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtUserPayload } from 'jsonwebtoken';

import { User } from '../models/index.ts';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  const accessToken = req.headers.authorization.split(' ')[1];

  if (!accessToken) return res.status(401).json({ message: 'Unauthorized' });

  try {
      const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET) as JwtUserPayload;

      const user = payload && await User.findByPk(payload.id);

      if (!user) throw new Error(); // TODO: set new error

      req.user = { id: user.id };

      next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}