import { Model, DataTypes } from 'sequelize';

import { db } from '../config/db.config.ts';

class Version extends Model {}

Version.init(
  {
  body: { type: DataTypes.TEXT, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: db,
    modelName: 'version',
  }
);

export { Version };