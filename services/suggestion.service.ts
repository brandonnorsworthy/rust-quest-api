import { executeQuery } from "../database/connection"

export default {
  getSuggestions: async (offset: number): Promise<{
    id: number;
    title: string;
    description: string;
    username: string;
    isLastPage?: boolean;
  }[]> => {
    const query = `
    WITH paginated_suggestions AS (
      SELECT s.id,
        s.title,
        s.description,
        u.username
      FROM suggestions s
        JOIN users u ON s.user_id = u.id
      WHERE s.deleted_by IS NULL
      ORDER BY s.id
      LIMIT 20 OFFSET (($1 - 1) * 20)
    )
    SELECT *,
      CASE
        WHEN COUNT(*) OVER () < 20 THEN TRUE
        ELSE FALSE
      END AS isLastPage
    FROM paginated_suggestions;
    `;
    const values = [offset]

    return await executeQuery(query, values);
  },

  getLeaderboard: async () => {
    const query = `
    SELECT u.id,
      u.username,
      u.approved_suggestions AS suggestions
    FROM users u
      JOIN roles r ON u.role_id = r.id
    WHERE
      r.name != 'guest'
      AND u.approved_suggestions > 0
    ORDER BY u.approved_suggestions DESC,
      u.id ASC
    LIMIT 20;
    `;

    return await executeQuery(query);
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
      u.username,
      s.user_id
    FROM suggestions s
      JOIN users u ON s.user_id = u.id
    WHERE s.id = $1;
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