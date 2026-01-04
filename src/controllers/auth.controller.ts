import { type Request, type Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt, { type JwtUserPayload } from 'jsonwebtoken';

import { User } from '../models/user.model.ts';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/auth.util.ts';

async function createUser(req: Request, res: Response) {
  const {
    username,
    email,
    password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = User.build({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  return res.status(200).json({
    message: `User ${username} created successfully!`,
  });
}

async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  const isPasswordMatch = user
    ? await bcrypt.compare(password, user.password)
    : false;

  if (!isPasswordMatch) return res.status(401).json({
    message: 'User not found.',
  });

  const accessToken = generateAccessToken(user!.id);
  const refreshToken = generateRefreshToken(user!.id);

  // Assign refresh token in http-only cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN * 1000, // in milliseconds
  });

  return res.status(200).json({ data: { accessToken } });
};

async function refreshAccessToken(req: Request, res: Response) {
  const refreshToken: string | undefined = req.cookies?.jwt;

  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET) as JwtUserPayload;

      // Generate new access token
      const accessToken = generateAccessToken(payload.id);

      return res.status(200).json({ data: { accessToken } });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export {
  createUser,
  loginUser,
  refreshAccessToken,
};