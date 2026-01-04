import { Router } from 'express';

import { upload } from '../config/multer.config.ts';

import { authorize } from '../middlewares/authorize.middleware.ts';

import { getNoteAttachments } from '../controllers/attachment.controller.ts';

export const attachmentRouter = Router();

attachmentRouter.get('/', [
  authorize(),
  getNoteAttachments,
]);

attachmentRouter.post('/', [
  authorize('canEdit'),
  upload.single,

]);

attachmentRouter.delete('/', [
  authorize('canEdit'),

]);