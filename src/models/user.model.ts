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
import { Collaborator } from './collaborator.model.ts';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;

  declare versions?: NonAttribute<Version[]>;
  declare collaborators?: NonAttribute<Collaborator[]>;

  static associate() {
    User.hasMany(Version, {
      foreignKey: 'userId',
      as: 'versions',
    });
    User.hasMany(Collaborator, {
      foreignKey: 'userId',
      as: 'collaborators',
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
    tableName: 'users',
    underscored: true,
  }
);