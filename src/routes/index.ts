import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.middleware.ts';

import { authRouter } from './auth.route.ts';
import { noteRouter } from './note.route.ts';

export const router = Router();

router.get('/', (req, res) => res.send('Note Taking API'));

router.use('/auth', authRouter);

// Authenticate all other routes
router.use(authenticate);
router.use('/notes', noteRouter);
