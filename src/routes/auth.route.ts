import { Router } from 'express';

import {
  createUser,
  loginUser,
  refreshAccessToken,
} from '../controllers/auth.controller.ts';

export const authRouter = Router();

authRouter.post('/login', loginUser);

authRouter.post('/signup', createUser);

authRouter.post('/refresh', refreshAccessToken);