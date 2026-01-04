import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type CreationOptional,
} from 'sequelize';

import { db } from '../config/db.config.ts';

import { Attachment } from './attachment.model.ts';
import { Version } from './version.model.ts';

export interface NoteModel extends Model<
  InferAttributes<NoteModel>,
  InferCreationAttributes<NoteModel>
> {
  id: number;
  title: string;
  createdAt: CreationOptional<Date>;
  deletedAt: CreationOptional<Date>;
}

const Note = db.define<NoteModel>(
  'Note',
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
    paranoid: true, // Enables soft-deletion with deleteAt field
    underscored: true,
  }
);

Note.hasMany(Attachment);
Note.hasMany(Version);

export { Note };