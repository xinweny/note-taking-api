import { Router } from 'express';

import { authorize } from '../middlewares/authorize.middleware.ts';

import { getNoteVersions } from '../controllers/version.controller.ts';

export const versionRouter = Router();

versionRouter.get('/', [authorize(), getNoteVersions]);
