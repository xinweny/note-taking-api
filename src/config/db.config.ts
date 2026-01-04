import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: 'mysql',
});

// Test and sync database
try {
  await sequelize.authenticate();
  console.log('Database connection established successfully.');

  await sequelize.sync({ force: true });
  console.log('Database synchronization complete.')
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
}