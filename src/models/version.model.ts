import {
  Model,
  DataTypes,
  UUIDV4,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type NonAttribute,
  type ForeignKey,
} from 'sequelize';

import { sequelize } from '../config/db.config.ts';

import { User } from './user.model.ts';
import { Note } from './note.model.ts';

export class Version extends Model<
  InferAttributes<Version>,
  InferCreationAttributes<Version>
> {
  declare id: CreationOptional<string>;
  declare body: string;
  declare noteId: ForeignKey<Note['id']>;
  declare userId: ForeignKey<User['id']>;
  declare createdAt: CreationOptional<Date>;

  declare note?: NonAttribute<Note>;
  declare user?: NonAttribute<User>;

  static associate() {
    Version.belongsTo(Note, {
      foreignKey: 'noteId',
      as: 'note',
    });
    Version.belongsTo(User, {
      foreignKey: 'versionId',
      as: 'version',
    });
  }
}

Version.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    body: { type: DataTypes.TEXT, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: 'versions',
    underscored: true,
    timestamps: true,
    updatedAt: false, // disable update
    indexes: [
      {
        unique: true,
        fields: ['noteId', 'userId'],
      },
    ],
  },
);
