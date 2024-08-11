import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'

import Router from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/', Router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
