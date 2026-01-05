import { type Request, type Response } from 'express';

import { setCache } from '../utils/redis.util.ts';

import {
  createUserNote,
  getUserNotesByKeyword,
  getUserNoteById,
  getNotesByUserId,
  updateUserNote,
  deleteNoteById,
} from '../services/note.service.ts';

// Create empty note without any versions
export async function createNote(req: Request, res: Response) {
  const { title, body } = req.body;

  const note = await createUserNote(req.user!.id, {
    title,
    body,
  });

  return res.status(200).json({
    data: note,
  });
}

// Retrieve notes associated with the authenticated user (created and shared), and are not soft-deleted
export async function getAllNotes(req: Request, res: Response) {
  const query = req.query.search;

  const userId = req.user!.id;

  const notes = query
    ? await getUserNotesByKeyword(userId, query as string)
    : await getNotesByUserId(userId);

  await setCache(req.cacheKey, notes);

  return res.status(200).json({
    data: notes,
  });
}

// Get note by ID
export async function getNoteById(req: Request, res: Response) {
  const note = await getUserNoteById(+req.params.noteId!);

  await setCache(req.cacheKey, note);

  return res.status(200).json({
    data: note,
  });
}

// Update note body
export async function updateNote(req: Request, res: Response) {
  const { title, body } = req.body;

  const note = await updateUserNote(
    +req.params.noteId!,
    req.user!.id,
    { title, body }
  );

  return res.status(200).json({
    data: note,
  });
}

// Soft delete note
export async function deleteNote(req: Request, res: Response) {
  await deleteNoteById(+req.params.noteId!);

  return res.status(200).json({ message: 'Note soft-deleted successfully.' });
}