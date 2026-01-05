import { Version } from '../models/index.ts';

// Allow users to track changes to a note over time
export async function getVersionsByNoteId(noteId: number) {
  const versions = await Version.findAll({
    where: { noteId },
  });

  return versions;
}

// Get specific version of note to allow reversion to previous versions
export async function getNoteVersionById(versionId: string) {
  const version = await Version.findByPk(versionId, {
    include: {
      association: 'user',
      attributes: ['id', 'username'],
    },
  });

  return version;
}
