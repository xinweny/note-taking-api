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

export class Collaborator extends Model<
  InferAttributes<Collaborator>,
  InferCreationAttributes<Collaborator>
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare noteId: ForeignKey<Note['id']>;
  declare isAdmin: CreationOptional<boolean>;
  declare canEdit: CreationOptional<boolean>;

  declare user?: NonAttribute<User>;
  declare note?: NonAttribute<Note>;

  static associate() {
    Collaborator.belongsTo(Note, {
      foreignKey: 'noteId',
      as: 'note',
    });
    Collaborator.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

Collaborator.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isAdmin: {
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
    tableName: 'collaborators',
    underscored: true,
    timestamps: false,
  }
);