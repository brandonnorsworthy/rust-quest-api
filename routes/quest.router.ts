import express from 'express';
import questController from '../controllers/quest.controller';
import { validateBody, validateParams } from '../middleware/validate';
import questSchema from '../validationSchemas/questSchema';
import isAdmin from '../middleware/isAdmin';

const questRouter = express.Router();

// user routes
questRouter.get('/', questController.getAllQuests);
questRouter.get('/:id', validateParams(questSchema.idSchema), questController.getQuest);

// admin routes
questRouter.use(isAdmin);
questRouter.post('/', validateBody(questSchema.create), questController.createQuest);
questRouter.put('/:id', validateParams(questSchema.idSchema), validateBody(questSchema.update), questController.updateQuest);
questRouter.delete('/:id', validateParams(questSchema.idSchema), questController.deleteQuest);

export default questRouter;