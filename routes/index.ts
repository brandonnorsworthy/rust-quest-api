import express from 'express';

import userRouter from './user.router';
import authRouter from './auth.router';
import questRouter from './quest.router';
import suggestionRouter from './suggestion.router';

import authenticate from '../middleware/authenticate';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/users', authenticate, userRouter);
router.use('/quests', authenticate, questRouter);
router.use('/suggestions', authenticate, suggestionRouter);

export default router;