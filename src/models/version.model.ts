import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type NonAttribute,
} from 'sequelize';

import { db } from '../config/db.config.ts';

import { Note } from './note.model.ts';

export class Version extends Model<
  InferAttributes<Version>,
  InferCreationAttributes<Version>
> {
  declare id: CreationOptional<number>;
  declare body: string;
  declare createdAt: CreationOptional<Date>;

  declare note?: NonAttribute<Note>;
}

Version.belongsTo(Note)

Version.init(
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
    sequelize: db,
    underscored: true,
  }
);