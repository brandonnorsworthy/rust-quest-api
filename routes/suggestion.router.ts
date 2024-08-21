import express from 'express';
import suggestionController from '../controllers/suggestion.controller ';
import { validate } from '../middleware/validate';
import suggestionSchema from '../validationSchemas/suggestionSchema';

const suggestionRouter = express.Router();

suggestionRouter.get('/', suggestionController.getSuggestions);
suggestionRouter.post('/', validate(suggestionSchema.suggestion), suggestionController.createSuggestion);

export default suggestionRouter;