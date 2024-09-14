import { executeQuery } from "../database/connection"

export default {
  getSuggestions: async (offset: number): Promise<{
    id: number;
    title: string;
    description: string;
    username: string;
  }[]> => {
    const query = `
    SELECT s.id,
      s.title,
      s.description,
      u.username
    FROM suggestions s
      JOIN users u ON s.user_id = u.id
    WHERE deleted_by IS NULL
    ORDER BY id
    LIMIT 20 OFFSET (($1 - 1) * 20);
    `;
    const values = [offset]

    return await executeQuery(query, values);
  },

  getSuggestionById: async (suggestionId: number): Promise<{
    id: number;
    title: string;
    description: string;
    username: string;
    user_id: number;
  }> => {
    const query = `
    SELECT s.id,
      s.title,
      s.description,
      u.username
      s.user_id
    FROM suggestions s
      JOIN users u ON s.user_id = u.id
    WHERE s.id = 1
    LIMIT 20 OFFSET ((1 - 1) * 20);
    `
    const values = [suggestionId]

    return await executeQuery(query, values, true);
  },

  createSuggestion: async (userId: number, title: string, description: string) => {
    const query = `INSERT INTO suggestions (user_id, title, description) VALUES ($1, $2, $3);`;
    const values = [userId, title, description];

    return await executeQuery(query, values);
  },

  deleteSuggestion: async (suggestionId: number, userId: number) => {
    const query = `UPDATE suggestions
    SET deleted_by = $2
    WHERE id = $1;`;
    const values = [suggestionId, userId];

    return await executeQuery(query, values);
  }
}