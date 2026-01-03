import { Model, DataTypes } from 'sequelize';

import { db } from '../config/db.config.ts';

class Attachment extends Model {};

Attachment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true },
    },
  },
  {
    sequelize: db,
    modelName: 'attachment',
  }
);

export { Attachment };