import { executeQuery } from "../database/connection"
import Category from "../models/category";

export default {
  getCategories: async (): Promise<Category[]> => {
    const query = `SELECT *
    FROM categories
    LIMIT 100;`;

    return await executeQuery(query);
  },
}