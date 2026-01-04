import { Router } from 'express';

import { authorize } from '../middlewares/authorize.middleware.ts';

import {
  getNoteVersions,
  getVersionById,
} from '../controllers/version.controller.ts';

export const versionRouter = Router();

versionRouter.use(authorize());
versionRouter.get('/', getNoteVersions);
versionRouter.get('/:versionId', getVersionById);