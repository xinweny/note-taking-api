import jwt from 'jsonwebtoken';

function generateAccessToken(id) {
  return jwt.sign(
    { id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN } // in seconds
  );
}

function generateRefreshToken(id) {
  return jwt.sign(
    { id },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN } // in seconds
  );
}

export {
  generateAccessToken,
  generateRefreshToken,
};