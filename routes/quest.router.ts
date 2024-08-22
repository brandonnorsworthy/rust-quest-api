import express from 'express';
import questController from '../controllers/quest.controller';

const questRouter = express.Router();

questRouter.get('/', questController.getAllQuests);
questRouter.get('/:id', questController.getQuest);
questRouter.post('/', questController.createQuest);
questRouter.put('/:id', questController.updateQuest);
questRouter.delete('/:id', questController.deleteQuest);

export default questRouter;