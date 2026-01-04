import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

import { s3 } from '../config/aws.config.ts';

import { Attachment } from '../models/index.ts';

// Get all attachments associated with a note
export async function getAttachments(req: Request, res: Response) {
  const attachments = await Attachment.findAll({
    where: { noteId: +req.params.noteId! },
  });

  return res.status(200).json({
    data: attachments,
  });
}

// Upload attachment to AWS S3
export async function uploadAttachment(req: Request, res: Response) {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'File not found' });

    // Generate a unique file name
    const fileKey = `uploads/${uuidv4()}_${file.originalname}`;

    // Upload parameters for AWS S3
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Upload file to S3
    await s3.send(new PutObjectCommand(uploadParams));

    // Construct the CloudFront URL
    const fileUrl = `${process.env.CLOUDFRONT_URL}/${fileKey}`;

    // Save attachment to database
    const attachment = await Attachment.create({
      noteId: +req.params.noteId!,
      url: fileUrl,
    });

    return res.status(200).json({
      data: attachment,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'File upload failed.' });
  }
}

// Remove attachment
export async function deleteAttachment(req: Request, res: Response) {
  const attachmentId = +req.params.attachmentId!;

  const attachment = await Attachment.findByPk(attachmentId);

  if (!attachment) return res.status(404).json({
    message: 'Message not found',
  });

  const deleteParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: attachment.url.split('s3.amazonaws.com/').pop(),
  };

  await s3.send(new DeleteObjectCommand(deleteParams));

  await Attachment.destroy({
    where: { id: attachmentId },
  });

  return res.status(200).json({
    message: 'Attachment deleted successfully.',
  });
}