import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtUserPayload } from 'jsonwebtoken';

import { User } from '../models/user.model.ts';
import { Role } from '../models/role.model.ts';

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

export async function authorize(req: Request, res: Response, next: NextFunction) {
  const { noteId } = req.params;

  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const { id: userId } = req.user;

  // Check if authenticated user is an editor of the note
  const role = await Role.findOne({
    where: {
      noteId: +noteId!,
      userId,
    },
  });

  switch (req.method) {
    case 'GET':
      if (role) break; // Read allowed if user is an editor of the note
    case 'POST':
      if (role?.canEdit) break; // Edit allowed if user is an editor of the note and has canEdit permission
    default:
      return res.status(403).json({ message: 'Forbidden' });
  }

  next();
}