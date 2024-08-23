import express from 'express';

import userRouter from './user.router';
import authRouter from './auth.router';
import questRouter from './quest.router';
import categoryRouter from './category.router';
import suggestionRouter from './suggestion.router';

import authenticate from '../middleware/authenticate';

const router = express.Router();

// public routes
router.use('/auth', authRouter);

// private routes
router.use('/users', authenticate, userRouter);
router.use('/quests', authenticate, questRouter);
router.use('/categories', authenticate, categoryRouter);
router.use('/suggestions', authenticate, suggestionRouter);

export default router;