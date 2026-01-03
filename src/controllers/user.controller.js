import bcrypt from 'bcryptjs';

import { User } from '../models/user.model';

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

export {
  createUser,
};