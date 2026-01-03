import bcrypt from 'bcryptjs';

import { User } from '../models/user.model';

async function createUser(req, res) {
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

  res.status(200).json(`User ${username} creation successful!`);
}

export {
  createUser,
};