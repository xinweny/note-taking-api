import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type ForeignKey,
} from 'sequelize';

import { sequelize } from '../config/db.config.ts';

import { User } from './user.model.ts';
import { Note } from './note.model.ts';

export class Editor extends Model<
  InferAttributes<Editor>,
  InferCreationAttributes<Editor>
> {
  declare id: number;
  declare canEdit: boolean;
  declare noteId: ForeignKey<number>;
  declare userId: ForeignKey<number>;

  declare user?: NonAttribute<User>;
  declare note?: NonAttribute<Note>;
}

Editor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    canEdit: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
    underscored: true,
  }
);