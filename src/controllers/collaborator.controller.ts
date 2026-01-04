import { type Request, type Response } from 'express';

import { Collaborator } from '../models/index.ts';

export async function getNoteCollaborators(req: Request, res: Response) {
  const versions = await Collaborator.findAll({
    where: { noteId: +req.params.noteId! }
  });

  return res.status(200).json({
    data: versions,
  });
}