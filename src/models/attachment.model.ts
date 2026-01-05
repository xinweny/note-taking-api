import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type ForeignKey,
  type CreationOptional,
} from 'sequelize';

import { sequelize } from '../config/db.config.ts';

import { Note } from './note.model.ts';

export class Attachment extends Model<
  InferAttributes<Attachment>,
  InferCreationAttributes<Attachment>
> {
  declare id: CreationOptional<number>;
  declare url: string;
  declare noteId: ForeignKey<Note['id']>;

  declare note?: NonAttribute<Note>;

  static associate() {
    Attachment.belongsTo(Note, {
      foreignKey: 'noteId',
      as: 'note',
    });
  }
}

Attachment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true },
    },
  },
  {
    sequelize,
    tableName: 'attachments',
    underscored: true,
    timestamps: false,
  },
);
