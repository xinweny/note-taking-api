import { QueryTypes, type InferCreationAttributes } from 'sequelize';

import { sequelize } from '../config/db.config.ts';

import { NotFoundError } from '../errors/not-found-error.ts';

import { Note, Collaborator, Version } from '../models/index.ts';

// Create note with first version
export async function createUserNote(
  userId: number,
  params: InferCreationAttributes<
    Note,
    { omit: 'id' | 'createdAt' | 'deletedAt' }
  >,
) {
  const note = await Note.create(params);

  await Promise.all([
    // Create first version of the note
    Version.create({
      noteId: note.id,
      userId,
      body: note.body,
      createdAt: note.createdAt,
    }),
    // Create note creator with admin rights
    Collaborator.create({
      noteId: note.id,
      userId,
      isAdmin: true,
      canEdit: true,
    }),
  ]);

  return await Note.findByPk(note.id, {
    include: [
      {
        association: 'versions',
      },
    ],
  });
}

// Retrieve notes associated with the authenticated user (created and shared), and are not soft-deleted
export async function getNotesByUserId(userId: number) {
  const notes = await Note.findAll({
    where: { '$collaborators.user_id$': userId },
    include: [
      {
        association: 'versions',
        include: [
          {
            association: 'user',
            attributes: ['id', 'username'],
          },
        ],
      },
      {
        association: 'collaborators',
        include: [
          {
            association: 'user',
            attributes: ['id', 'username'],
          },
        ],
      },
    ],
  });

  return notes;
}

// Full text-search of user-associated notes
export async function getUserNotesByKeyword(userId: number, keyword: string) {
  // No native full-text search support in MYSQL, therefore must write raw SQL query
  const notes: Note[] = await sequelize.query(
    ' \
      SELECT * \
      FROM notes \
      INNER JOIN versions ON notes.id = versions.note_id \
      INNER JOIN collaborators ON notes.id = collaborators.note_id \
      WHERE collaborators.user_id = :userId \
      AND notes.deleted_at IS NULL \
      AND MATCH (notes.body) AGAINST (:query) \
    ',
    {
      replacements: {
        userId,
        query: keyword,
      },
      type: QueryTypes.SELECT,
      model: Note,
    },
  );

  return notes;
}

// Get note by ID
export async function getUserNoteById(noteId: number) {
  const note = await Note.findByPk(noteId, {
    include: [
      {
        association: 'versions',
        include: [
          {
            association: 'user',
            attributes: ['id', 'username'],
          },
        ],
      },
      {
        association: 'collaborators',
        include: [
          {
            association: 'user',
            attributes: ['id', 'username'],
          },
        ],
      },
    ],
  });

  return note;
}

// Update note body
export async function updateUserNote(
  noteId: number,
  userId: number,
  params: InferCreationAttributes<
    Note,
    { omit: 'id' | 'createdAt' | 'deletedAt' }
  >,
) {
  const { body, title } = params;

  // Prevent concurrent updates by optimistic locking (version=true) in model definition
  await Note.update({ title, body }, { where: { id: noteId } });

  // Retrieve updated note
  const note = await Note.findByPk(noteId);

  if (!note) throw new NotFoundError();

  // Create new version and save
  await Version.create({
    noteId: note.id,
    userId,
    body,
  });

  return note;
}

// Soft delete note
export async function deleteNoteById(noteId: number) {
  await Note.destroy({
    where: { id: noteId },
  });

  return;
}
