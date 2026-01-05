import { type Request, type Response } from 'express';

import {
  getCollaboratorsByNoteId,
  updateCollaboratorPermissions,
  deleteCollaboratorById,
} from '../services/collaborator.service.ts';

// Get all collaborators of a note
export async function getNoteCollaborators(req: Request, res: Response) {
  const collaborators = await getCollaboratorsByNoteId(+req.params.noteId!);

  return res.status(200).json({
    data: collaborators,
  });
}

// Update collaborator permissions
export async function updateCollaborator(req: Request, res: Response) {
  const collaborator = await updateCollaboratorPermissions(
    +req.params.collaboratorId!,
    {
      canEdit: !!req.body.canEdit,
    },
  );

  return res.status(200).json({
    data: collaborator,
  });
}

// Delete collaborator from note
export async function deleteCollaborator(req: Request, res: Response) {
  await deleteCollaboratorById(+req.params.collaboratorId!);

  return res.status(200).json({
    message: 'Collaborator deleted successfully.',
  });
}
