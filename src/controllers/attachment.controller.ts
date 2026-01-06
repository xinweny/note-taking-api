import { type Request, type Response } from 'express';

import { BadRequestError } from '../errors/bad-request-error.ts';

import {
  getAttachmentsByNoteId,
  uploadAttachmentToS3,
  deleteAttachmentById,
} from '../services/attachment.service.ts';

// Get all attachments associated with a note
export async function getAttachments(req: Request, res: Response) {
  const attachments = await getAttachmentsByNoteId(+req.query.noteId!);

  return res.status(200).json({
    data: attachments,
  });
}

// Upload attachment to AWS S3
export async function uploadAttachment(req: Request, res: Response) {
  const file = req.file;

  if (!file) throw new BadRequestError();

  const attachment = await uploadAttachmentToS3(file, +req.body.noteId!);

  return res.status(200).json({
    data: attachment,
  });
}

// Remove attachment
export async function deleteAttachment(req: Request, res: Response) {
  await deleteAttachmentById(+req.params.attachmentId!);

  return res.status(200).json({
    message: 'Attachment deleted successfully.',
  });
}
