import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model.js';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/auth.util.js';

async function createUser(res, req) {
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

async function loginUser(res, req) {
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

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Assign refresh token in http-only cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN * 1000, // in milliseconds
  });

  return res.status(200).json({ data: { accessToken } });
};

function refreshAccessToken(req, res) {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (err, payload) => {
      if (err || !payload) return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = generateAccessToken(payload.id);

      return res.status(200).json({ data: { accessToken } });
    }
  );
};

export {
  createUser,
  loginUser,
  refreshAccessToken,
};