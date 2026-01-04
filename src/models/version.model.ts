import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type NonAttribute,
  type ForeignKey,
} from 'sequelize';

import { sequelize } from '../config/db.config.ts';

import { User } from './user.model.ts';
import { Note } from './note.model.ts';

export class Version extends Model<
  InferAttributes<Version>,
  InferCreationAttributes<Version>
> {
  declare id: CreationOptional<number>;
  declare body: string;
  declare userId: ForeignKey<User['id']>;
  declare createdAt: CreationOptional<Date>;

  declare note?: NonAttribute<Note>;
  declare user?: NonAttribute<User>;

  static setAssociations() {
    Version.belongsTo(Note);
    Version.belongsTo(User);
  }
}

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
    sequelize,
    underscored: true,
  }
);
