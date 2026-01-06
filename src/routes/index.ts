import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.middleware.ts';

import { authRouter } from './auth.route.ts';
import { noteRouter } from './note.route.ts';
import { collaboratorRouter } from './collaborator.route.ts';
import { versionRouter } from './version.route.ts';
import { attachmentRouter } from './attachment.route.ts';

export const router = Router();

router.use('/auth', authRouter);

// Authenticated routes
router.use('/notes', [authenticate, noteRouter]);
router.use('/collaborators', [authenticate, collaboratorRouter]);
router.use('/versions', [authenticate, versionRouter]);
router.use('/attachments', [authenticate, attachmentRouter]);
