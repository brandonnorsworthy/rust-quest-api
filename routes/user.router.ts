import express from 'express';
import userController from '../controllers/user.controller';
import isAdmin from '../middleware/isAdmin';
import { validateBody, validateParams } from '../middleware/validate';
import userSchema from '../validationSchemas/userSchema';

const userRouter = express.Router();

// user routes
userRouter.post(
  '/completed-quests/:questId',
  validateParams(userSchema.questIdSchema),
  userController.completeQuest
);
userRouter.delete(
  '/completed-quests/:questId',
  validateParams(userSchema.questIdSchema),
  userController.removeCompletedQuest
);
userRouter.get('/completed-quests', userController.getCompletedQuests);
userRouter.put(
  '/settings',
  validateBody(userSchema.settingsSchema),
  userController.updateSettings
);

// admin routes
userRouter.get(
  '/',
  isAdmin,
  userController.getUsers
);
userRouter.get(
  '/:username',
  isAdmin,
  userController.getUserByUsername
);

export default userRouter;