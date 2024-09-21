import express from 'express';
import suggestionController from '../controllers/suggestion.controller ';
import { validateBody, validateParams, validateQuery } from '../middleware/validate';
import suggestionSchema from '../validationSchemas/suggestionSchema';
import { isAdmin, isModerator } from '../middleware/isRole';

const suggestionRouter = express.Router();

// public routes
suggestionRouter.post(
  '/',
  validateBody(suggestionSchema.suggestion),
  suggestionController.createSuggestion
);
suggestionRouter.get(
  '/leaderboard',
  suggestionController.getLeaderboard
)

// moderator routes
suggestionRouter.get(
  '/',
  isModerator,
  validateQuery(suggestionSchema.allSuggestions),
  suggestionController.getSuggestions
);
suggestionRouter.delete(
  '/:suggestionId',
  isModerator,
  validateParams(suggestionSchema.suggestionId),
  suggestionController.deleteSuggestion
);

// admin routes
suggestionRouter.post(
  '/:suggestionId/quest',
  isAdmin,
  validateParams(suggestionSchema.suggestionId),
  validateBody(suggestionSchema.convertSuggestionIntoQuestBody),
  suggestionController.convertSuggestionIntoQuest
);

export default suggestionRouter;