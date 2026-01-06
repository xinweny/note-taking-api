import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type CreationOptional,
} from 'sequelize';

import { sequelize } from '../config/db.config.ts';

import { Version } from './version.model.ts';
import { Collaborator } from './collaborator.model.ts';
import { Attachment } from './attachment.model.ts';

export class Note extends Model<
  InferAttributes<Note>,
  InferCreationAttributes<Note>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare body: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare versions?: NonAttribute<Version[]>;
  declare attachments?: NonAttribute<Attachment[]>;
  declare collaborators?: NonAttribute<Collaborator[]>;

  static associate() {
    Note.hasMany(Collaborator, {
      foreignKey: 'noteId',
      as: 'collaborators',
    });
    Note.hasMany(Attachment, {
      foreignKey: 'noteId',
      as: 'attachments',
    });
    Note.hasMany(Version, {
      foreignKey: 'noteId',
      as: 'versions',
    });
  }
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE },
    body: { type: DataTypes.TEXT, allowNull: false },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: 'notes',
    paranoid: true, // Enables soft-deletion with deleteAt field
    timestamps: true,
    underscored: true,
    version: true, // Enable optimistic locking to handle concurrency
    indexes: [
      { type: 'FULLTEXT', name: 'text_idx', fields: ['body'] }, // Add FULLTEXT index
    ],
  },
);
