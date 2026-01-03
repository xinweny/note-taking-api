import { DataTypes } from 'sequelize';

import { db } from '../config/db.js';

const Editor = db.define('Editor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  canEdit: { type: DataTypes.BOOLEAN, allowNull: false },
});

export { Editor };