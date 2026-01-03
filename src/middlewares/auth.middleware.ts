import jwt from 'jsonwebtoken';

import { User } from '../models/user.model.ts';
import { Editor } from '../models/editor.model.ts';

async function authenticate(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  const accessToken = req.headers.authorization.split(' ')[1];

  if (!accessToken) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    async (err, payload) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });

      const user = payload && await User.findByPk(payload.id);

      if (!user) return res.status(401).json({ message: 'Unauthorized' });

      req.user = user;

      next();
    }
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

  switch (req.method) {
    case 'GET':
      if (editor) break; // Read allowed if user is an editor of the note
    case 'POST':
      if (editor?.canEdit) break; // Edit allowed if user is an editor of the note and has canEdit permission
    default:
      return res.status(403).json({ message: 'Forbidden' });
  }

  next();
}

export {
  authenticate,
  authorize,
};