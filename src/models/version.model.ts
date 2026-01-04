import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from 'sequelize';

import { db } from '../config/db.config.ts';

export interface VersionModel extends Model<
  InferAttributes<VersionModel>,
  InferCreationAttributes<VersionModel>
> {
  id: number;
  body: string;
  createdAt: Date;
}

const Version = db.define<VersionModel>(
  'Version',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    body: { type: DataTypes.TEXT, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    underscored: true,
  }
);

export { Version };