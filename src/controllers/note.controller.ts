import { type Request, type Response } from 'express';

import { Note, Permission } from '../models/index.ts';

export async function createNote(req: Request, res: Response) {
  const note = await Note.build({
    title: req.body.title,
  }).save();

  await Permission.build({
    noteId: note.id,
    userId: req.user!.id,
  }).save();

  return res.status(200);
}

export async function getAllUserNotes(req: Request, res: Response) {
  
}