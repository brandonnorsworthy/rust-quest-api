import express from 'express';
import rateLimit from 'express-rate-limit';

import authController from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import authSchema from '../validationSchemas/authSchema';

const authRouter = express.Router();

const rateLimitMinutes = 5;
const authRateLimiter = rateLimit({
  windowMs: rateLimitMinutes * 60 * 1000,
  message: `Too many requests from this IP, please try again after ${rateLimitMinutes} minutes`,
});

authRouter.use(authRateLimiter);

authRouter.post('/register', validate(authSchema.register), authController.register);
authRouter.post('/login', validate(authSchema.login), authController.login);

export default authRouter;