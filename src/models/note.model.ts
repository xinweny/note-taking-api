import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type CreationOptional,
} from 'sequelize';

import { db } from '../config/db.config.ts';

import { User } from './user.model.ts';
import { Version } from './version.model.ts';
import { Editor } from './editor.model.ts';
import { Attachment } from './attachment.model.ts';

export class Note extends Model<
  InferAttributes<Note>,
  InferCreationAttributes<Note>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare createdAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare user?: NonAttribute<User>;
  declare versions?: NonAttribute<Version[]>;
  declare editors?: NonAttribute<Editor[]>;
  declare attachments?: NonAttribute<Attachment[]>;
}

Note.belongsTo(User);

Note.hasMany(Editor);
Note.hasMany(Version);
Note.hasMany(Attachment);

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
    paranoid: true, // Enables soft-deletion with deleteAt field
    underscored: true,
  }
);