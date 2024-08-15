import express from 'express';
import questController from '../controllers/quest.controller';

const questRouter = express.Router();

questRouter.get('/', questController.getQuests);

export default questRouter;