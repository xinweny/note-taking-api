import { type Request, type Response } from 'express';

import {
  getVersionsByNoteId,
  getNoteVersionById,
} from '../services/version.service.ts';

// Allow users to track changes to a note over time
export async function getNoteVersions(req: Request, res: Response) {
  const versions = await getVersionsByNoteId(+req.query.noteId!);

  return res.status(200).json({
    data: versions,
  });
}

// Get specific version of note to allow reversion to previous versions
export async function getVersionById(req: Request, res: Response) {
  const version = await getNoteVersionById(req.params.versionId!);

  return res.status(200).json({
    data: version,
  });
}
