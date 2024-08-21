import { executeQuery } from "../database/connection"

export default {
  getSuggestions: async () => {
    const query = `SELECT * FROM suggestions;`;

    return await executeQuery(query);
  },

  createSuggestion: async (userId: string, title: string, description: string) => {
    const query = `INSERT INTO suggestions (user_id, title, description) VALUES ($1, $2, $3);`;
    const values = [userId, title, description];

    return await executeQuery(query, values);
  }
}