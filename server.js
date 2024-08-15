import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import morgan from 'morgan';
import { EXPRESS_PORT } from './config.js';

import Router from './src/routes/index.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/', Router);

app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
});
