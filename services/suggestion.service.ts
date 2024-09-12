import { executeQuery } from "../database/connection"

export default {
  getSuggestions: async (offset: number = 1) => {
    const query = `
    WITH suggestions_with_user AS (
      SELECT
        s.id,
        s.title,
        s.description,
        u.username
      FROM
        suggestions s
      JOIN
        users u ON s.user_id = u.id
    )
    SELECT
      id,
      title,
      description,
      username
    FROM
      suggestions_with_user
    ORDER BY
      id
    LIMIT 20 OFFSET (($1 - 1) * 20);
    `;
    const values = [offset]

    return await executeQuery(query, values);
  },

  createSuggestion: async (userId: string, title: string, description: string) => {
    const query = `INSERT INTO suggestions (user_id, title, description) VALUES ($1, $2, $3);`;
    const values = [userId, title, description];

    return await executeQuery(query, values);
  }
}