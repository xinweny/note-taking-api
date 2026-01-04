import { type Request, type Response } from 'express';
import { Op } from 'sequelize';

import { Note, Permission, Version } from '../models/index.ts';

// Create empty note without any versions
export async function createNote(req: Request, res: Response) {
  const note = await Note.build({
    title: req.body.title,
  }).save();

  // Add note creator with admin rights
  await Permission.build({
    noteId: note.id,
    userId: req.user!.id,
    isAdmin: true,
    canEdit: true,
  }).save();

  return res.status(200);
}

// Retrieve notes associated with the authenticated user (created and shared)
export async function getAllNotes(req: Request, res: Response) {
  const { search } = req.query;

  const permissions = await Permission.findAll({
    where: { userId: req.user!.id },
  });

  const notes = await Note.findAll({
    include: {
      model: Version,
      as: 'currentVersion',
      where: {
        // TODO: implement full-text search
      },
    },
  })

  return res.status(200).json({
    data: {
      permissions,
      notes,
    },
  });
}

// Get note by ID
export async function getNoteById(req: Request, res: Response) {
  const userId = req.user!.id;
  const noteId = +req.params.noteId!

  const permission = await Permission.findOne({
    where: { noteId, userId },
    include: {
      model: Note,
      include: [Version],
    },
  });

  if (!permission) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json({
    data: permission.note,
  });
}

// Update note version or name
export async function updateNote(req: Request, res: Response) {
  const userId = req.user!.id;
  const noteId = +req.params.noteId!

  const permission = await Permission.findOne({
    where: { noteId, userId },
  });

  if (!permission?.canEdit) return res.status(403).json({ message: 'Forbidden' });

  const { title, currentVersionId } = req.body;

  // TODO: add concurrency handling strategy
  const note = await Note.findByPk(noteId);

  if (!note) return res.status(400).json({ message: 'Note not found.' });

  note.set({ title });

  if (currentVersionId) {
    const version = await Version.findByPk(currentVersionId);

    if (!version) return res.status(400).json({ message: 'Note version not found.' });

    note.set({ currentVersionId });
  }

  await note.save();
}

// Soft delete note
export async function deleteNote(req: Request, res: Response) {
  const userId = req.user!.id;
  const noteId = +req.params.noteId!

  const permission = await Permission.findOne({
    where: { noteId, userId },
  });

  if (!permission?.isAdmin) return res.status(403).json({ message: 'Forbidden' });

  await Note.destroy({
    where: { id: noteId },
  });

  return res.status(200).json({ message: 'Note soft-deleted successfully.' })
}