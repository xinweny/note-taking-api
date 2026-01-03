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

async function authorize(req, res, next) {
  const { id: userId } = req.user;
  const { noteId } = req.params;

  // Check if authenticated user is an editor of the note
  const editor = await Editor.findOne({
    where: {
      noteId,
      userId,
    },
  });

  if (!editor)

  if (!req.headers.authorization) return res.status(401).json('Unauthorized');

    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) return res.status(401).json('Unauthorized');

    const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);

    const user = payload && await User.findByPk(payload.id);

    if (!user) return res.status(403).json('Forbidden');

    next();
}

export {
  generateAccessToken,
  generateRefreshToken,
};