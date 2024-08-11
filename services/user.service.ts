import { executeQuery } from "../database/connection";

export default {
  getUser: async (username: string) => {
    const query = `SELECT * FROM users WHERE username = $1`;
    const values = [username];

    return await executeQuery(query, values);
  },

  getAllUsers: async () => {
    const query = `SELECT * FROM users`;

    return await executeQuery(query);
  },
}
