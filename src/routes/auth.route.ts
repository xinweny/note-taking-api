import { Router } from 'express';

import {
  signupUser,
  loginUser,
  refreshAccessToken,
} from '../controllers/auth.controller.ts';

export const authRouter = Router();

authRouter.post('/signup', signupUser);

authRouter.post('/login', loginUser);

authRouter.post('/refresh', refreshAccessToken);
