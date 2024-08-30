import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'
import morgan from 'morgan';

import { ALLOWED_ORIGINS, EXPRESS_PORT } from './config';
import Router from './routes';
import authenticate from './middleware/authenticate';

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
// restrict cors
app.use(cors(corsOptions));
// allow preflight requests
app.options('*', cors(corsOptions));

// trust nginx proxy
app.set('trust proxy', 1);
// log requests
app.use(morgan('dev'));
// parse json and urlencoded data
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
