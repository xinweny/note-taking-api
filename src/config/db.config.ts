import { Sequelize } from 'sequelize';

const db = new Sequelize({
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: 'mysql',
});

export { db };