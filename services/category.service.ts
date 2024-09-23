import { executeQuery } from "../database/connection"
import Category from "../models/category";

export default {
  getCategories: async (): Promise<Category[]> => {
    const query = `SELECT *
    FROM categories
    LIMIT 100;`;

    return await executeQuery(query);
  },

  async getAvailableCategories(userId: number, categoryFilters: number[] | null): Promise<Category[]> {
    const query = `
      SELECT DISTINCT c.id, c.name, c.weight
      FROM categories c
      JOIN quests q ON q.category_id = c.id
      WHERE 
        ($1::INTEGER[] IS NULL OR c.id = ANY($1))
        AND c.deleted_by IS NULL
        AND q.id NOT IN (
          SELECT UNNEST(completed_quests)
          FROM users
          WHERE id = $2
        )
        AND q.soft_deleted IS NOT TRUE
    `;
    const values = [categoryFilters, userId];

    const categories = await executeQuery(query, values);
    return categories || [];
  },

  selectRandomCategory(categories: Category[]): Category {
    const totalWeight = categories.reduce((acc, cat) => acc + cat.weight, 0);
    const randomRoll = Math.random() * totalWeight;
    let currentWeight = 0;

    for (const category of categories) {
      currentWeight += category.weight;
      if (randomRoll <= currentWeight) {
        return category;
      }
    }
    return categories[0]; // Fallback in case of an edge case.
  },
}