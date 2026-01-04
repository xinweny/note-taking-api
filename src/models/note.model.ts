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
import { Permission } from './permission.model.ts';
import { Attachment } from './attachment.model.ts';

export class Note extends Model<
  InferAttributes<Note>,
  InferCreationAttributes<Note>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare body: string;
  declare createdAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare versions?: NonAttribute<Version[]>;
  declare attachments?: NonAttribute<Attachment[]>;
  declare permissions?: NonAttribute<Permission[]>;

  static setAssociations() {
    Note.hasMany(Permission, {
      foreignKey: 'noteId',
      as: 'permissions',
    });
    Note.hasMany(Attachment, {
      foreignKey: 'noteId',
      as: 'attachments',
    });
    Note.hasMany(Version, {
      foreignKey: 'noteId',
      as: 'versions'
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
    body: { type: DataTypes.TEXT, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    paranoid: true, // Enables soft-deletion with deleteAt field
    underscored: true,
    version: true, // Enable optimistic locking to handle concurrency
  }
);