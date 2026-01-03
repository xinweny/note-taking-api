import { DataTypes } from 'sequelize';

import { db } from '../config/db.js';

import { Note } from './note.js';
import { Editor } from './editor.js';

const User = db.define('User', {
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
});

User.hasMany(Note);
User.hasMany(Editor);

export { User };