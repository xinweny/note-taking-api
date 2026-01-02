import { DataTypes } from 'sequelize';

import { db } from '../config/db.js';

const Editor = db.define('Editor', {
  canEdit: { type: DataTypes.BOOLEAN, allowNull: false },
});

export { Editor };