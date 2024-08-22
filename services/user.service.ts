import { executeQuery } from "../database/connection";

export default {
  getAllUsers: async () => {
    const query = `SELECT
      id,
      username,
      role,
      oauth_provider,
      oauth_id
    FROM users
    LIMIT 100;`;

    return await executeQuery(query);
  },

  getUserByUsername: async (username: string) => {
    const query = `SELECT * FROM users WHERE username = $1`;
    const values = [username];

    return await executeQuery(query, values, true);
  },

  getCompletedQuests: async (userId: number) => {
    const query = `SELECT q.id AS quest_id,
      q.title AS quest_title,
      q.description AS quest_description,
      q.image_url AS quest_image_url,
      c.name AS category_name
    FROM users u
      JOIN quests q ON q.id = ANY(u.completed_quests)
      JOIN categories c ON q.category_id = c.id
    WHERE u.id = $1;`;
    const values = [userId];

    return await executeQuery(query, values);
  }
}