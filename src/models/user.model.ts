import { Model, DataTypes } from 'sequelize';

import { db } from '../config/db.config.ts';

import { Note } from './note.model.ts';
import { Editor } from './editor.model.ts';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: 'user',
  }
);

User.hasMany(Note);
User.hasMany(Editor);

export { User };