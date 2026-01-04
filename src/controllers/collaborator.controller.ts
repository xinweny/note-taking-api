import { type Request, type Response } from 'express';

import { Collaborator } from '../models/index.ts';

// Get all collaborators of a note
export async function getNoteCollaborators(req: Request, res: Response) {
  const collaborators = await Collaborator.findAll({
    where: { noteId: +req.params.noteId! }
  });

  return res.status(200).json({
    data: collaborators,
  });
}

// Update collaborator permissions
export async function updateCollaborator(req: Request, res: Response) {
  const canEdit = !!req.body.canEdit;

  await Collaborator.update(
    { canEdit },
    {
      where: { id: +req.params.collaboratorId! }
    }
  );

  return res.status(200).json({
    message: 'Collaborator permissions updated successfully.',
  });
}

// Delete collaborator from note
export async function deleteCollaborator(req: Request, res: Response) {
  await Collaborator.destroy({
    where: { id: +req.params.collaboratorId! },
  });

  return res.status(200).json({
    message: 'Collaborator deleted successfully.'
  });
}