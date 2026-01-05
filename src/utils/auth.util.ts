import jwt from 'jsonwebtoken';

export function generateAccessToken(userId: number) {
  return jwt.sign(
    { id: userId } as object,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRES_IN },
  );
}

export function generateRefreshToken(userId: number) {
  return jwt.sign(
    { id: userId } as object,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: +process.env.JWT_REFRESH_TOKEN_EXPIRES_IN },
  );
}
