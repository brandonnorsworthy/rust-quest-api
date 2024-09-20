import express from 'express';
import categoryController from '../controllers/category.controller';
import isAdmin from '../middleware/isAdmin';

const categoryRouter = express.Router();

categoryRouter.get(
  '/',
  categoryController.getAllCategories
);

export default categoryRouter;