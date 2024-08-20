import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'
import morgan from 'morgan';
import { EXPRESS_PORT } from './config';

import Router from './routes';
import authenticate from './middleware/authenticate';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', authenticate, (request: Request, response: Response) => {
  const tokenData = (request as any).tokenData;
  if (tokenData) {
    response.send(`Hello, ${tokenData.username}!`);
  }
});

app.use('/', Router);

app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
});
