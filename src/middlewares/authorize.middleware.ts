import { type Request, type Response, type NextFunction } from 'express';
import { type InferAttributes } from 'sequelize';

import { AuthorizationError } from '../errors/authorization-error.ts';

import { Collaborator } from '../models/index.ts';

export function authorize(
  role:
    | keyof InferAttributes<Collaborator, { omit: 'id' | 'userId' | 'noteId' }>
    | null = null,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { noteId } = req.params;

    // Check if authenticated user is a collaborator of the note
    const collaborator = await Collaborator.findOne({
      where: {
        noteId: +noteId!,
        userId: req.user!.id,
      },
    });

    if (role ? !collaborator?.[role] : !collaborator)
      throw new AuthorizationError();

    next();
  };
}
