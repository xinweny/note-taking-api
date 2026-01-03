import { DataTypes } from 'sequelize';

import { db } from '../config/db.js';

import { Attachment } from './attachment.js';
import { Version } from './version.js';

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize: db,
    modelName: 'Note',
  }
);

Note.hasMany(Attachment);
Note.hasMany(Version);

export { Note };