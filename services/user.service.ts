import { executeQuery } from "../database/connection";

type UserQuest = {
  quest_id: number;
  quest_title: string;
  quest_description: string;
  quest_image_url: string;
  category_name: string;
};

export default {
  getAllUsers: async () => {
    const query = `SELECT
      id,
      username,
      role,
      oauth_provider,
      oauth_id
    FROM users
    LIMIT 25;`;

    return await executeQuery(query);
  },

  getUserByUsername: async (username: string) => {
    const query = `SELECT * FROM users WHERE username = $1`;
    const values = [username];

    return await executeQuery(query, values, true);
  },

  getCompeltedQuests: async (userId: number): Promise<Number[]> => {
    const query = `SELECT completed_quests FROM users WHERE id = $1`;
    const values = [userId];

    return await executeQuery(query, values, true);
  },

  getCompletedQuests: async (userId: number): Promise<UserQuest[]> => {
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
  },

  completeQuest: async (userId: number, questId: number) => {
    const query = `UPDATE users
    SET completed_quests = array_append(completed_quests, $1)
    WHERE id = $2`;
    const values = [questId, userId];

    return await executeQuery(query, values);
  },

  markQuestIncomplete: async (userId: number, questId: number) => {
    const query = `UPDATE users
    SET completed_quests = array_remove(completed_quests, $1)
    WHERE id = $2`;
    const values = [questId, userId];

    return await executeQuery(query, values);
  }
}