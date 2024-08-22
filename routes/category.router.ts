import express from 'express';
import categoryController from '../controllers/category.controller';

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getAllCategories);

export default categoryRouter;