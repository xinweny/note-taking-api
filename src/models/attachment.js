import { DataTypes } from 'sequelize';

import { db } from '../config/db.js';

const Attachment = db.define('Attachment', {
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
});

export { Attachment };