import { type Request, type Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt, { type JwtUserPayload } from 'jsonwebtoken';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/auth.util.ts';

import { AuthenticationError } from '../errors/authentication-error.ts';

import { createUser, getUserByEmail } from '../services/user.service.ts';

export async function signupUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await createUser({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(200).json({
    data: {
      id: user.id,
      username,
      email,
    },
  });
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  const isPasswordMatch = user
    ? await bcrypt.compare(password, user.password)
    : false;

  if (!isPasswordMatch) throw new AuthenticationError();

  const accessToken = generateAccessToken(user!.id);
  const refreshToken = generateRefreshToken(user!.id);

  // Assign refresh token in http-only cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN * 1000, // in milliseconds
  });

  console.log('hi');

  return res.status(200).json({ data: { accessToken } });
}

export async function refreshAccessToken(req: Request, res: Response) {
  const refreshToken: string | undefined = req.cookies?.jwt;

  if (!refreshToken) throw new AuthenticationError();

  const payload = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
  ) as JwtUserPayload;

  // Generate new access token
  const accessToken = generateAccessToken(payload.id);

  return res.status(200).json({ data: { accessToken } });
}
