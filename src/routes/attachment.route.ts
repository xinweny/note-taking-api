import { Router } from 'express';

import { upload } from '../config/multer.config.ts';

import { authorize } from '../middlewares/authorize.middleware.ts';

import {
  getAttachments,
  uploadAttachment,
  deleteAttachment,
} from '../controllers/attachment.controller.ts';

export const attachmentRouter = Router();

attachmentRouter.get('/', [authorize(), getAttachments]);

attachmentRouter.post('/', [
  authorize('canEdit'),
  upload.single('file'),
  uploadAttachment,
]);

attachmentRouter.delete('/:attachmentId', [
  authorize('canEdit'),
  deleteAttachment,
]);
