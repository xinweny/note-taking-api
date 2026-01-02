import { DataTypes } from 'sequelize';

import { db } from '../config/db.js';

import { Note } from './note.js';
import { Editor } from './editor.js';

const User = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: { type: DataTypes.STRING(64), allowNull: false },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
});

User.hasMany(Note);
User.hasMany(Editor);

export { User };