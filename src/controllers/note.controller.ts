import { type Request, type Response } from 'express';

import { checkCache, setCache, invalidateCache } from '../utils/redis.util.ts';

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
  const userId = req.user!.id;

  const { title, body } = req.body;

  const note = await createUserNote(userId, {
    title,
    body,
  });

  await invalidateCache(`notes:${userId}`);

  return res.status(200).json({
    data: note,
  });
}

// Retrieve notes associated with the authenticated user (created and shared), and are not soft-deleted
export async function getAllNotes(req: Request, res: Response) {
  const query = req.query.keywords || '';
  const userId = req.user!.id;

  const cacheKey = `notes:${userId}:${query}`;

  const cached = await checkCache(cacheKey);

  if (cached) return res.status(200).json({ data: cached });

  const notes = query
    ? await getUserNotesByKeyword(userId, query as string)
    : await getNotesByUserId(userId);

  await setCache(cacheKey, notes);

  return res.status(200).json({
    data: notes,
  });
}

// Get note by ID
export async function getNoteById(req: Request, res: Response) {
  const noteId = +req.params.noteId!;

  const note = await getUserNoteById(noteId);

  const cacheKey = `note:${noteId}`;

  const cached = await checkCache(cacheKey);

  if (cached) return res.status(200).json({ data: cached });

  await setCache(cacheKey, note);

  return res.status(200).json({
    data: note,
  });
}

// Update note body
export async function updateNote(req: Request, res: Response) {
  const { title, body } = req.body;

  const noteId = +req.params.noteId!;
  const userId = req.user!.id;

  const note = await updateUserNote(noteId, userId, {
    title,
    body,
  });

  await Promise.all([
    invalidateCache(`note:${note.id}`),
    invalidateCache(`notes:${userId}`),
  ]);

  return res.status(200).json({
    data: note,
  });
}

// Soft delete note
export async function deleteNote(req: Request, res: Response) {
  const noteId = +req.params.noteId!;
  const userId = req.user!.id;

  await deleteNoteById(noteId);

  await Promise.all([
    invalidateCache(`note:${noteId}`),
    invalidateCache(`notes:${userId}`),
  ]);

  return res.status(200).json({ message: 'Note soft-deleted successfully.' });
}
