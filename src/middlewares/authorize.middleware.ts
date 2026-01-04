import { type Request, type Response, type NextFunction } from 'express';
import { type InferAttributes } from 'sequelize';

import { Permission } from '../models/index.ts';

export function authorize(
  role: keyof InferAttributes<
    Permission,
    { omit: 'id' | 'userId' | 'noteId' }
  > | null = null
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { noteId } = req.params;

    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { id: userId } = req.user;

    // Check if authenticated user is an editor of the note
    const permission = await Permission.findOne({
      where: {
        noteId: +noteId!,
        userId,
      },
    });

    if (role ? !permission?.[role] : !permission) return res.status(403).json({ message: 'Forbidden' });

    next();
  };
}