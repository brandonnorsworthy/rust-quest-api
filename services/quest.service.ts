import { executeQuery } from "../database/connection"

type UpdateQuestParams = {
  title?: string;
  description?: string;
  objectives?: string[];
  imageUrl?: string;
  categoryId?: number;
};

/**
 * Helper function to convert camelCase keys to snake_case for SQL.
 */
const toSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export default {
  getQuests: async () => {
    const query = `SELECT
        quests.id,
        quests.title,
        quests.description,
        quests.objectives,
        quests.image_url,
        categories.name AS category
      FROM
        quests
      JOIN
        categories ON quests.category_id = categories.id
      ORDER BY
        quests.id DESC;
    `;

    return await executeQuery(query);
  },

  getQuest: async (questId: number) => {
    const query = `SELECT
        quests.id,
        quests.title,
        quests.description,
        quests.objectives,
        quests.image_url,
        categories.name AS category
      FROM
        quests
      JOIN
        categories ON quests.category_id = categories.id
      WHERE
        quests.id = $1;
    `;
    const values = [questId];

    return await executeQuery(query, values, true);
  },

  getQuestByTitle: async (title: string) => {
    const query = `SELECT * FROM quests WHERE title = $1;`;
    const values = [title];

    return await executeQuery(query, values, true);
  },

  createQuest: async (title: string, description: string, objectives: string[], imageUrl: string, categoryId: number) => {
    const query = `
      INSERT INTO quests (title, description, objectives, image_url, category_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [title, description, objectives, imageUrl, categoryId];

    return await executeQuery(query, values, true);
  },

  updateQuest: async (questId: number, params: UpdateQuestParams) => {
    const fields = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key], index) => `${toSnakeCase(key)} = $${index + 1}`);

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `
      UPDATE quests
      SET ${fields.join(', ')}
      WHERE id = $${fields.length + 1}
      RETURNING *;
    `;

    const values = [...Object.values(params).filter(value => value !== undefined), questId];

    return await executeQuery(query, values, true);
  },

  deleteQuest: async (questId: number) => {
    const query = `DELETE FROM quests WHERE id = $1;`;
    const values = [questId];

    return await executeQuery(query, values);
  },
}