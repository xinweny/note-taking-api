import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { errorHandler } from './middlewares/error.middleware.ts';

import { router } from './routes/index.ts';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use qs library when true; Use querystring library when false
app.use(cookieParser());

router.get('/', (req, res) => {
  return res.status(200).json('Note Taking API');
});

// App router
app.use(router);

// 404 not found for all other routes
router.use('/{*path}', (req, res) => {
  return res.status(404).json('Not Found');
});

// Custom error handler middleware
app.use(errorHandler);

export { app };
