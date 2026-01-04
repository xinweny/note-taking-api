import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type CreationOptional,
} from 'sequelize';

import { sequelize } from '../config/db.config.ts';

import { Version } from './version.model.ts';
import { Permission } from './permission.model.ts';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;

  declare versions?: NonAttribute<Version[]>;
  declare permissions?: NonAttribute<Permission[]>;

  static setAssociations() {
    User.hasMany(Version, {
      foreignKey: 'userId',
      as: 'versions',
    });
    User.hasMany(Permission, {
      foreignKey: 'userId',
      as: 'permissions',
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, 
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    underscored: true,
  }
);