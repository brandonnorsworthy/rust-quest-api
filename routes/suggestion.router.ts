import express from 'express';
import suggestionController from '../controllers/suggestion.controller ';
import { validateBody, validateParams, validateQuery } from '../middleware/validate';
import suggestionSchema from '../validationSchemas/suggestionSchema';
import isAdmin from '../middleware/isAdmin';

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

// admin routes
suggestionRouter.get(
  '/',
  isAdmin,
  validateQuery(suggestionSchema.allSuggestions),
  suggestionController.getSuggestions
);
suggestionRouter.post(
  '/:suggestionId/quest',
  isAdmin,
  validateParams(suggestionSchema.convertSuggestionIntoQuest),
  validateBody(suggestionSchema.convertSuggestionIntoQuestBody),
  suggestionController.convertSuggestionIntoQuest
);

export default suggestionRouter;