import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type CreationOptional,
} from 'sequelize';

import { db } from '../config/db.config.ts';

import { Note } from './note.model.ts';
import { Editor } from './editor.model.ts';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;

  declare notes?: NonAttribute<Note>;
  declare editors?: NonAttribute<Editor>;
}

User.hasMany(Note);
User.hasMany(Editor);

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, 
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    underscored: true,
  }
);