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
  declare createdAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare versions?: NonAttribute<Version[]>;
  declare attachments?: NonAttribute<Attachment[]>;
  declare permissions?: NonAttribute<Permission[]>;

  static setAssociations() {
    Note.hasMany(Permission);
    Note.hasMany(Attachment);
    Note.hasMany(Version);
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
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    paranoid: true, // Enables soft-deletion with deleteAt field
    underscored: true,
  }
);