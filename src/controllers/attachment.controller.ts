import { type Request, type Response } from 'express';

import {
  getAttachmentsByNoteId,
  uploadAttachmentToS3,
  deleteAttachmentById,
} from '../services/attachment.service.ts';

// Get all attachments associated with a note
export async function getAttachments(req: Request, res: Response) {
  const attachments = await getAttachmentsByNoteId(+req.params.noteId!);

  return res.status(200).json({
    data: attachments,
  });
}

// Upload attachment to AWS S3
export async function uploadAttachment(req: Request, res: Response) {
  try {
    const file = req.file;

    if (!file) throw new Error();

    const attachment = await uploadAttachmentToS3(file, +req.params.noteId!);

    return res.status(200).json({
      data: attachment,
    });
  } catch (error) {
    console.error('Error uploading file:', error);

    return res.status(500).json({ message: 'File upload failed.' });
  }
}

// Remove attachment
export async function deleteAttachment(req: Request, res: Response) {
  await deleteAttachmentById(+req.params.attachmentId!);

  return res.status(200).json({
    message: 'Attachment deleted successfully.',
  });
}
