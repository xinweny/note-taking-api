import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { router } from './routes/index.ts';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use qs library when true; Use querystring library when false

app.use(cookieParser());

app.use(router);

export { app };