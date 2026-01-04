import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type ForeignKey,
  type CreationOptional,
} from 'sequelize';

import { sequelize } from '../config/db.config.ts';

import { User } from './user.model.ts';
import { Note } from './note.model.ts';

export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  declare id: number;
  declare userId: ForeignKey<number>;
  declare noteId: ForeignKey<number>;
  declare isOwner: CreationOptional<boolean>;
  declare canEdit: CreationOptional<boolean>;

  declare user?: NonAttribute<User>;
  declare note?: NonAttribute<Note>;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isOwner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canEdit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
  }
);