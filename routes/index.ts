import express from 'express';

import userRouter from './user.router.js';
import authRouter from './auth.router.js';
import questRouter from './quest.router.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/users', authenticate, userRouter);
router.use('/quests', authenticate, questRouter);

export default router;