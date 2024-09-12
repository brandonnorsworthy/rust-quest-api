import express from 'express';
import suggestionController from '../controllers/suggestion.controller ';
import { validateBody, validateQuery } from '../middleware/validate';
import suggestionSchema from '../validationSchemas/suggestionSchema';
import isAdmin from '../middleware/isAdmin';

const suggestionRouter = express.Router();

// public routes
suggestionRouter.post(
  '/',
  validateBody(suggestionSchema.suggestion),
  suggestionController.createSuggestion
);

// admin routes
suggestionRouter.get(
  '/',
  isAdmin,
  validateQuery(suggestionSchema.allSuggestions),
  suggestionController.getSuggestions
);

export default suggestionRouter;