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
        ($1::BOOLEAN IS TRUE OR c.id = ANY($2::INTEGER[]))
        AND c.deleted_by IS NULL
        AND q.id NOT IN (
          SELECT UNNEST(completed_quests)
          FROM users
          WHERE id = $3
        )
        AND q.soft_deleted IS NOT TRUE
    `;

    // Determine if categoryFilters is empty
    const isCategoryFiltersEmpty = !categoryFilters || categoryFilters.length === 0;

    // If categoryFilters is empty, set it to null, otherwise use the array
    const values = [isCategoryFiltersEmpty, categoryFilters, userId];


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