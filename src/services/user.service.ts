import { User } from '../models/index.ts';

import type { InferAttributes } from 'sequelize';

export async function createUser(
  params: InferAttributes<User, { omit: 'id' | 'createdAt' }>,
) {
  const user = await User.create(params);

  return user;
}

export async function getUserById(userId: number) {
  const user = await User.findByPk(userId);

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await User.findOne({
    where: { email },
  });

  return user;
}
