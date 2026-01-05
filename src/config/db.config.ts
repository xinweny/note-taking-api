import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: 'mysql',
});

export async function syncDb() {
  try {
    await sequelize.sync({
      // force: true, // drop all tables
      force: false,
      logging: false,
    });
    console.log('Database synchronization complete.');
  } catch (error) {
    console.error('Unable to sync to database:', error);
  }
}
