import jwt from 'jsonwebtoken';

import { tryCatch } from '@helpers/tryCatch.js';
import { CustomError } from '@helpers/CustomError.js';

export const authenticate = tryCatch(
  async (req, res, next) => {
    if (!req.headers.authorization) throw new CustomError(401, 'Unauthorized');

    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) throw new CustomError(401, 'Unauthorized');

    const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);

    const user = await userService.getById(payload._id, '+verified');

    if (!user) throw new CustomError(401, 'Unauthorized');
    if (!user.verified) throw new CustomError(403, 'Unverified user', { user });

    req.user = user;

    next();
  }
)