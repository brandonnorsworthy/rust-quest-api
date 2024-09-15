import { Request, Response } from "express";
import categoryService from "../services/category.service";

export default {
  getAllCategories: async (request: Request, response: Response) => {
    try {
      const categories = await categoryService.getCategories();
      if (categories.length === 0) {
        return response.status(404).send('No categories found');
      }

      return response.send(categories);
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while fetching categories');
    }
  },
}