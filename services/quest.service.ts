import { executeQuery } from "../database/connection";
import { categoryName } from "../models/category";
import Quest from "../models/quest";
import { toSnakeCase } from "../utils/toSnakeCase";
import categoryService from "./category.service";
import userService from "./user.service";

type UpdateQuestParams = {
  title?: string;
  description?: string;
  objectives?: string[];
  imageUrl?: string;
  categoryId?: number;
};

export default {
  getQuestsByUserId: async (page: number, userId: number): Promise<{
    id: number;
    title: string;
    description: string;
    objectives: string[];
    image_url: string;
    category: categoryName;
    completed: boolean
  }[]> => {
    const query = `
    SELECT
        quests.id,
        quests.title,
        quests.description,
        quests.objectives,
        quests.image_url,
        categories.name AS category,
        su.username,
        CASE
            WHEN quests.id = ANY(users.completed_quests) THEN true
            ELSE false
        END AS completed
    FROM
        quests
    JOIN
        categories ON quests.category_id = categories.id
    LEFT JOIN
        users su ON su.id = quests.suggested_by
    LEFT JOIN
        users ON users.id = $2
    WHERE
        soft_deleted IS NOT TRUE
    ORDER BY
        quests.id
    LIMIT 20 OFFSET (($1 - 1) * 20);
  `;
    const values = [page, userId];

    return await executeQuery(query, values);
  },

  getQuestById: async (questId: number): Promise<{
    id: number;
    title: string;
    description: string;
    objectives: string[];
    image_url: string;
    category: categoryName;
    updated_at?: Date;
    soft_deleted?: boolean;
    deleted_by?: number;
  }> => {
    const query = `SELECT
      q.id,
      q.title,
      q.description,
      q.objectives,
      q.image_url,
      c.name AS category,
      q.updated_at,
      q.soft_deleted,
      q.deleted_by,
      su.username
    FROM
      quests q
    JOIN
      categories c ON q.category_id = c.id
    LEFT JOIN
      users su ON su.id = q.suggested_by
    WHERE
      q.id = $1;
    `;
    const values = [questId];

    return await executeQuery(query, values, true);
  },

  async getRandomQuest(userId: number): Promise<Quest | null> {
    // 1. Fetch user preferences
    const { categoryFilters, completedQuests } = await userService.getUserPreferences(userId);
    console.log(categoryFilters, completedQuests);

    // 2. Fetch available categories based on user filters
    const availableCategories = await categoryService.getAvailableCategories(userId, categoryFilters);
    if (!availableCategories.length) {
      return null;
    }

    // 3. Select a random category
    const selectedCategory = categoryService.selectRandomCategory(availableCategories);

    // 4. Fetch a random quest from the selected category that the user has not completed
    const questQuery = `
      SELECT
        quests.id,
        quests.title,
        quests.description,
        quests.objectives,
        quests.image_url,
        categories.name AS category,
        su.username
      FROM
        quests
      JOIN
        categories ON quests.category_id = categories.id
      LEFT JOIN
        users su on su.id = quests.suggested_by
      WHERE
        quests.id NOT IN (SELECT UNNEST($1::INTEGER[]))
        AND category_id = $2
        AND soft_deleted IS NOT TRUE
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const questValues = [completedQuests, selectedCategory.id];

    return await executeQuery(questQuery, questValues, true);
  },

  getQuestByTitle: async (title: string): Promise<Quest> => {
    const query = `SELECT * FROM quests WHERE title = $1;`;
    const values = [title];

    return await executeQuery(query, values, true);
  },

  createQuest: async (title: string, description: string, objectives: string[], categoryId: number, suggestedByUserId: number, imageUrl?: string): Promise<Quest> => {
    const query = `
      INSERT INTO quests (title, description, objectives, category_id, suggested_by, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [title, description, objectives, categoryId, suggestedByUserId, imageUrl];

    const newQuest = await executeQuery(query, values, true);

    const userQuest = `
      UPDATE users
      SET approved_suggestions = approved_suggestions + 1
      WHERE id = $1;
    `
    await executeQuery(userQuest, [suggestedByUserId]);

    return newQuest
  },

  updateQuest: async (questId: number, userId: number, params: UpdateQuestParams): Promise<Quest> => {
    const fields = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key], index) => `${toSnakeCase(key)} = $${index + 1}`);

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `
      UPDATE quests
      SET ${fields.join(', ')},
        updated_at = NOW(),
        updated_by = $${fields.length + 2}
      WHERE id = $${fields.length + 1}
      RETURNING *;
    `;

    const values = [...Object.values(params).filter(value => value !== undefined), questId, userId];

    return await executeQuery(query, values, true);
  },

  deleteQuest: async (questId: number, userId: number): Promise<boolean> => {
    const query = `UPDATE quests
    SET
      updated_at = NOW(),
      deleted_by = $2,
      soft_deleted = true
    WHERE id = $1;`;
    const values = [questId, userId];

    return await executeQuery(query, values);
  },
}