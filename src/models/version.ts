import { DataTypes } from 'sequelize';

import { db } from '../config/db.js';

const Version = db.define('Version', {
  body: { type: DataTypes.TEXT, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
});

export { Version };