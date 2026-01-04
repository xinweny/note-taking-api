import { Router } from 'express';

import { authorize } from '../handlers/authorize.handler.ts';

import {
  getNoteVersions,
  getVersionById,
} from '../controllers/version.controller.ts';

export const versionRouter = Router();

versionRouter.get('/', [
  authorize(),
  getNoteVersions,
]);

versionRouter.get('/:versionId', [
  authorize(),
  getVersionById,
]);