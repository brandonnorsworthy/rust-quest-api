import express from 'express';

import userRouter from './user.router';
import authRouter from './auth.router';
import questRouter from './quest.router';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/quests', questRouter);

export default router;