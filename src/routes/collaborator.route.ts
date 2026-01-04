import { Router } from 'express';

import { authorize } from '../handlers/authorize.handler.ts';

import {
  getNoteCollaborators,
  updateCollaborator,
  deleteCollaborator,
} from '../controllers/collaborator.controller.ts';

export const collaboratorRouter = Router();

collaboratorRouter.get('/', [
  authorize(),
  getNoteCollaborators,
]);

collaboratorRouter.put('/:collaboratorId', [
  authorize('isAdmin'),
  updateCollaborator,
]);

collaboratorRouter.delete('/:collaboratorId', [
  authorize('isAdmin'),
  deleteCollaborator,
]);