import cookieParser from 'cookie-parser';
import express from 'express';

import { authRouter } from './routes/auth.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use qs library when true; Use querystring library when false

app.use(cookieParser());

app.get('/', (req, res) => res.send('Note Taking API'));
app.use('/auth', authRouter);

export { app };