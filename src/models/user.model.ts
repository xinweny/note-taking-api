import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from 'sequelize';

import { db } from '../config/db.config.ts';

import { Note, type NoteModel } from './note.model.ts';
import { Editor } from './editor.model.ts';

export interface UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  id: number;
  username: string;
  email: string;
  password: string;
  notes?: NonAttribute<NoteModel[]>,
}

const User = db.define<UserModel>(
  'User',
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
    underscored: true,
  }
);

User.hasMany(Note);
User.hasMany(Editor);

export { User };