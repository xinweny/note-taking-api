import { DataTypes } from 'sequelize';

import { db } from '../config/db.js';

import { Attachment } from './attachment.js';
import { Version } from './version.js';

const Note = db.define('Note', {
  title: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  deletedAt: { type: DataTypes.DATE },
});

Note.hasMany(Attachment);
Note.hasMany(Version);

export { Note };