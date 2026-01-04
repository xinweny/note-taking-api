import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from 'sequelize';

import { db } from '../config/db.config.ts';

export interface EditorModel extends Model<
  InferAttributes<EditorModel>,
  InferCreationAttributes<EditorModel>
> {
  id: number;
  canEdit: boolean;
  // notes?: NonAttribute<NoteModel>,
}

const Editor = db.define<EditorModel>(
  'Editor',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    canEdit: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    underscored: true,
  }
);

export { Editor };