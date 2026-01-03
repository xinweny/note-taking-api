
import { Op } from 'sequelize';

import { User } from '../models/user.model';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/auth.util';

async function loginUser(res, req) {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email: { [Op.eq]: email } },
  });

  const isPasswordMatch = user
    ? await bcrypt.compare(password, user.password)
    : false;

  if (!isPasswordMatch) return res.status(401).json({
    message: 'User not found.',
  });

  const accessToken = generateAccessToken({ userId: user.id, canEdit: false });

  const refreshToken = generateRefreshToken(user.id);

  // Assign refresh token in http-only cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN * 1000, // in milliseconds
  });

  return res.status(200).json({
    data: { accessToken },
  });
};

async function refreshAccessToken(req, res) {
  
};

export {
  loginUser,
  refreshAccessToken,
};