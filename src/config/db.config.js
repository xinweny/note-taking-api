import { Sequelize } from 'sequelize';

const db = new Sequelize({
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306,
  host: process.env.DATABASE_HOST || 'localhost',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dialect: 'mysql',
});

export { db };