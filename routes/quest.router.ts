import express from 'express';
import questController from '../controllers/quest.controller';
import { validateBody, validateParams, validateQuery } from '../middleware/validate';
import questSchema from '../validationSchemas/questSchema';
import { isAdmin, isModerator } from '../middleware/isRole';

const questRouter = express.Router();

// user routes
questRouter.get(
  '/',
  validateQuery(questSchema.allQuests),
  questController.getAllQuests
);
questRouter.get('/random-quest',
  validateQuery(questSchema.filterSchema),
  questController.getRandomQuest
)
questRouter.get(
  '/:id',
  validateParams(questSchema.idSchema),
  questController.getQuest,
);

// moderator routes
questRouter.put(
  '/:id',
  isModerator,
  validateParams(questSchema.idSchema),
  validateBody(questSchema.update),
  questController.updateQuest
);
questRouter.delete(
  '/:id',
  isModerator,
  validateParams(questSchema.idSchema),
  questController.deleteQuest
);

// admin routes
questRouter.post(
  '/',
  isAdmin,
  validateBody(questSchema.create),
  questController.createQuest
);

export default questRouter;