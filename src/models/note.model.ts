import { Model, DataTypes } from 'sequelize';

import { db } from '../config/db.config.ts';

import { Attachment } from './attachment.model.ts';
import { Version } from './version.model.ts';

class Note extends Model {};

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