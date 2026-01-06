import { Router } from 'express';

import { authorize } from '../middlewares/authorize.middleware.ts';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/note.controller.ts';

export const noteRouter = Router();

noteRouter.post('/', createNote);

noteRouter.get('/', getAllNotes);

noteRouter.get('/:noteId', [authorize(), getNoteById]);

noteRouter.put('/:noteId', [authorize('canEdit'), updateNote]);

noteRouter.delete('/:noteId', [authorize('isAdmin'), deleteNote]);
