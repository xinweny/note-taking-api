import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.middleware.ts';

import { authRouter } from './auth.route.ts';
import { noteRouter } from './note.route.ts';

export const router = Router();

router.use('/auth', authRouter);

// Authenticate note routes
router.use('/notes', [authenticate, noteRouter]);
