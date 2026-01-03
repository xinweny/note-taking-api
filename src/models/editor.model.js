import { Model, DataTypes } from 'sequelize';

import { db } from '../config/db.config.js';

class Editor extends Model {}

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
    sequelize: db,
    modelName: 'editor',
  }
);

export { Editor };