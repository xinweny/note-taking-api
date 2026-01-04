import { type Request, type Response } from 'express';

import { Note } from '../models/note.model.ts';
import { Role } from '../models/role.model.ts';

export async function createNote(req: Request, res: Response) {
  const note = Note.build({
    title: req.body.title,
    userId: req.user!.id,
  });

  await note.save();

  return res.status(200);
}

export async function getAllUserNotes(req: Request, res: Response) {
  
}