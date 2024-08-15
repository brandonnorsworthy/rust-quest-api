import { executeQuery } from "../database/connection.js"

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
  }
}