import { Router } from 'express';

import { permissionRouter } from './permission.route.ts';

export const noteRouter = Router();

noteRouter.use('/:noteId/permissions', permissionRouter);