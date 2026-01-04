import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Attachment } from '../models/index.ts';

// Get all attachments associated with a note
export async function getNoteAttachments(req: Request, res: Response) {
  const attachments = await Attachment.findAll({
    where: { noteId: +req.params.noteId! },
  });

  return res.status(200).json({
    data: attachments,
  });
}

// Upload attachment to AWS S3
export async function uploadAttachment(req: Request, res: Response) {
}