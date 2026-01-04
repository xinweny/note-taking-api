import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from 'sequelize';

import { db } from '../config/db.config.ts';

export interface AttachmentModel extends Model<
  InferAttributes<AttachmentModel>,
  InferCreationAttributes<AttachmentModel>
> {
  id: number;
  url: string;
  // notes?: NonAttribute<NoteModel>,
}

const Attachment = db.define<AttachmentModel>(
  'Attachment',
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
    underscored: true,
  }
);

export { Attachment };