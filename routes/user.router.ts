import express from 'express';
import userController from '../controllers/user.controller';
import isAdmin from '../middleware/isAdmin';

const userRouter = express.Router();

// user routes
userRouter.get('/completed-quests', userController.getCompletedQuests);

// admin routes
userRouter.use(isAdmin);
userRouter.get('/', userController.getUsers);
userRouter.get('/:username', userController.getUserByUsername);

export default userRouter;