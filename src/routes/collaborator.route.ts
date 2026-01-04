import { Router } from 'express';

import { authorize } from '../middlewares/authorize.middleware.ts';

import {
  getNoteCollaborators,
  updateCollaborator,
  deleteCollaborator,
} from '../controllers/collaborator.controller.ts';

export const collaboratorRouter = Router();

collaboratorRouter.use(authorize());
collaboratorRouter.get('/', getNoteCollaborators);

collaboratorRouter.use(authorize('isAdmin'));
collaboratorRouter.put('/:collaboratorId', updateCollaborator);
collaboratorRouter.delete('/:collaboratorId', updateCollaborator);