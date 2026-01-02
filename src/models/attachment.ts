import { DataTypes } from 'sequelize';

import { db } from '../config/db.js';

const Attachment = db.define('Attachment', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isUrl: true },
  },
});

export { Attachment };