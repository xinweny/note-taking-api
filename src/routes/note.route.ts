import { Router } from 'express';

import { authorize } from '../middlewares/authorize.middleware.ts';

import { permissionRouter } from './permission.route.ts';
import { versionRouter } from './version.route.ts';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/note.controller.ts';

export const noteRouter = Router();

noteRouter.get('/', getAllNotes);

noteRouter.post('/', createNote);

noteRouter.use('/:noteId/permissions', permissionRouter);
noteRouter.use('/:noteId/versions', versionRouter);

noteRouter.use(authorize());
noteRouter.get('/:noteId', getNoteById);

noteRouter.use(authorize('canEdit'));
noteRouter.put('/:noteId', updateNote);

noteRouter.use(authorize('isAdmin'));
noteRouter.delete('/:noteId', deleteNote);