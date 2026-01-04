import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from 'sequelize';

import { db } from '../config/db.config.ts';

import { Note } from './note.model.ts';

export class Attachment extends Model<
  InferAttributes<Attachment>,
  InferCreationAttributes<Attachment>
> {
  declare id: number;
  declare url: string;
  
  note?: NonAttribute<Note>;
}

Attachment.belongsTo(Note);

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
    sequelize: db,
    underscored: true,
  }
);