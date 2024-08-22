import express from 'express';
import userController from '../controllers/user.controller';
import authenticate from '../middleware/authenticate';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:username', userController.getUserByUsername);
userRouter.get('/:id/completed-quests', userController.getCompletedQuests);

export default userRouter;