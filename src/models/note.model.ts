import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type CreationOptional,
  type ForeignKey,
} from 'sequelize';

import { sequelize } from '../config/db.config.ts';

import { Version } from './version.model.ts';
import { Role } from './role.model.ts';
import { Attachment } from './attachment.model.ts';

export class Note extends Model<
  InferAttributes<Note>,
  InferCreationAttributes<Note>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare userId: ForeignKey<number>;
  declare createdAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare versions?: NonAttribute<Version[]>;
  declare roles?: NonAttribute<Role[]>;
  declare attachments?: NonAttribute<Attachment[]>;
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

Note.hasMany(Version, { foreignKey: 'noteId' });
Note.hasMany(Role, { foreignKey: 'noteId' });
Note.hasMany(Attachment, { foreignKey: 'noteId' });