import { type Request, type Response } from 'express';

import { Note, Permission, Version } from '../models/index.ts';

// Create empty note without any versions
export async function createNote(req: Request, res: Response) {
  const { title, body } = req.body;

  const note = await Note.build({
    title,
    body,
  }).save();

  await Promise.all([
    // Create first version of the note
    Version.create({
      noteId: note.id,
      userId: req.user!.id,
      body,
      createdAt: note.createdAt,
    }),
    // Create note creator with admin rights
    Permission.create({
      noteId: note.id,
      userId: req.user!.id,
      isAdmin: true,
      canEdit: true,
    }),
  ]);

  return res.status(200).json({
    message: 'Note created successfully.'
  });
}

// Retrieve notes associated with the authenticated user (created and shared), and are not soft-deleted
export async function getAllNotes(req: Request, res: Response) {
  const { search } = req.query; // TODO: fulltext search

  const permissions = await Permission.findAll({
    where: { userId: req.user!.id },
  });

  const notes = await Note.findAll({
    where: { deletedAt: undefined },
  });

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

// Update note body
export async function updateNote(req: Request, res: Response) {
  const noteId = +req.params.noteId!

  const { body } = req.body;

  // TODO: add concurrency handling strategy
  await Note.update(
    { body },
    { where: { id: noteId } }
  );
  
  // Retrieve updated note
  const note = await Note.findByPk(noteId);

  // Create new version and save
  await Version.create({
    noteId: noteId,
    userId: req.user!.id,
    body,
    createdAt: note?.createdAt,
  });

  return res.status(200).json({
    data: note,
  });
}

// Soft delete note
export async function deleteNote(req: Request, res: Response) {
  const noteId = +req.params.noteId!

  await Note.destroy({
    where: { id: noteId },
  });

  return res.status(200).json({ message: 'Note soft-deleted successfully.' });
}