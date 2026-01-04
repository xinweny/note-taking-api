import { Router, type Request } from 'express';

import { authorize } from '../middlewares/authorize.middleware.ts';
import { checkCache } from '../middlewares/redis.middleware.ts';

import { collaboratorRouter } from './collaborator.route.ts';
import { versionRouter } from './version.route.ts';
import { attachmentRouter } from './attachment.route.ts';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/note.controller.ts';

export const noteRouter = Router();

noteRouter.get('/', [
  authorize(),
  checkCache((req: Request) => `notes:${req.user!.id}.userId`),
  getAllNotes,
]);

noteRouter.post('/', createNote);

noteRouter.use('/:noteId/collaborators', collaboratorRouter);
noteRouter.use('/:noteId/versions', versionRouter);
noteRouter.use('/:noteId/attachments', attachmentRouter);

noteRouter.get('/:noteId', [
  authorize(),
  checkCache((req: Request) => `note:${req.params.noteId}:id`),
  getNoteById,
]);

noteRouter.put('/:noteId', [
  authorize('canEdit'),
  updateNote,
]);

noteRouter.delete('/:noteId', [
  authorize('isAdmin'),
  deleteNote,
]);