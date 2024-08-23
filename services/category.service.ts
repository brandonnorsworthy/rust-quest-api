import { executeQuery } from "../database/connection"

export default {
  getCategories: async () => {
    const query = `SELECT * FROM categories;`;

    return await executeQuery(query);
  },
}