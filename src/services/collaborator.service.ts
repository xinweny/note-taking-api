import { type InferAttributes } from 'sequelize';

import { Collaborator } from '../models/index.ts';

// Get all collaborators of a note
export async function getCollaboratorsByNoteId(noteId: number) {
  const collaborators = await Collaborator.findAll({
    where: { noteId },
    include: {
      association: 'user',
      attributes: ['id', 'username'],
    },
  });

  return collaborators;
}

// Update collaborator permissions
export async function updateCollaboratorPermissions(
  collaboratorId: number,
  params: InferAttributes<
    Collaborator,
    { omit: 'id' | 'userId' | 'noteId' | 'isAdmin' }
  >,
) {
  const collaborator = await Collaborator.findByPk(collaboratorId);

  if (!collaborator) throw new Error();

  collaborator.set(params);

  await collaborator?.save();

  return collaborator;
}

// Delete collaborator from note
export async function deleteCollaboratorById(collaboratorId: number) {
  await Collaborator.destroy({
    where: { id: collaboratorId },
  });

  return;
}
