import express from 'express';
import userController from '../controllers/user.controller';
import isAdmin from '../middleware/isAdmin';

const userRouter = express.Router();

// user routes
userRouter.post('/completed-quests/:questId', userController.completeQuest);
userRouter.get('/completed-quests', userController.getCompletedQuests);

// admin routes
userRouter.get('/', isAdmin, userController.getUsers);
userRouter.get('/:username', isAdmin, userController.getUserByUsername);

export default userRouter;