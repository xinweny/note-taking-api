import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import { authRouter } from './routes/auth.route.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use qs library when true; Use querystring library when false

app.use(cookieParser());

app.get('/', (req, res) => res.send('Note Taking API'));
app.use('/auth', authRouter);

export { app };