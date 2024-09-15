import express from 'express';
import rateLimit from 'express-rate-limit';

import authController from '../controllers/auth.controller';
import { validateBody } from '../middleware/validate';
import authSchema from '../validationSchemas/authSchema';
import authenticate from '../middleware/authenticate';
import { minutesToMs } from '../utils/minutesToMs';

const authRouter = express.Router();

authRouter.post(
  '/register',
  rateLimit({
    windowMs: minutesToMs(30),
    limit: 2,
    message: `Too many requests from this IP, please try again later`,
  }),
  validateBody(authSchema.register),
  authController.register
);
authRouter.post(
  '/register/guest',
  validateBody(authSchema.register),
  authenticate,
  authController.registerGuest
);

authRouter.post(
  '/login',
  rateLimit({
    windowMs: minutesToMs(15),
    limit: 10,
    message: `Too many requests from this IP, please try again later`,
  }),
  validateBody(authSchema.login),
  authController.login
);
authRouter.post(
  '/login/guest',
  rateLimit({
    windowMs: minutesToMs(30),
    limit: 3,
    message: `Too many requests from this IP, please try again later`,
  }),
  authController.guestLogin,
);

authRouter.post(
  '/token',
  authenticate,
  authController.token
);


export default authRouter;