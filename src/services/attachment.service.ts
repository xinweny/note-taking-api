import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

import { s3 } from '../config/aws.config.ts';

import { NotFoundError } from '../errors/not-found-error.ts';

import { Attachment } from '../models/index.ts';

// Get all attachments associated with a note
export async function getAttachmentsByNoteId(noteId: number) {
  const attachments = await Attachment.findAll({
    where: { noteId },
  });

  return attachments;
}

// Upload attachment to AWS S3
export async function uploadAttachmentToS3(
  file: Express.Multer.File,
  noteId: number,
) {
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
    noteId,
    url: fileUrl,
  });

  return attachment;
}

// Remove attachment
export async function deleteAttachmentById(attachmentId: number) {
  const attachment = await Attachment.findByPk(attachmentId);

  if (!attachment) throw new NotFoundError();

  const deleteParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: attachment.url.split('s3.amazonaws.com/').pop(),
  };

  await s3.send(new DeleteObjectCommand(deleteParams));

  await Attachment.destroy({
    where: { id: attachmentId },
  });

  return;
}
