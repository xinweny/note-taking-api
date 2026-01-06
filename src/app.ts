import express, { type Response } from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swagger from 'swagger-ui-express';

import swaggerDoc from '../swagger.json' with { type: 'json' };

import { errorHandler } from './middlewares/error.middleware.ts';

import { router } from './routes/index.ts';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use qs library when true; Use querystring library when false
app.use(cookieParser());

// API documentation
app.get('/', (req, res: Response) => {
  return res.redirect('/docs');
});
app.use('/docs', swagger.serve, swagger.setup(swaggerDoc));

// App router
app.use('/api', router);

// 404 not found for all other routes
router.use('/{*path}', (req, res) => {
  return res.status(404).json('Not Found');
});

// Custom error handler middleware
app.use(errorHandler);

export { app };
