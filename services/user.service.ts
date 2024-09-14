import { executeQuery } from "../database/connection";
import Role from "../models/role";
import User, { metadata } from "../models/user";

export default {
  getAllUsers: async (): Promise<{
    id: number;
    username: string;
    role: Role;
  }[]> => {
    const query = `SELECT
      u.id,
      u.username,
      r.name AS role
    FROM users u
    JOIN roles r ON u.role_id = r.id
    LIMIT 20;`;

    return await executeQuery(query);
  },

  getUserById: async (userId: number): Promise<{
    id: number;
    username: string;
    metadata: metadata;
    role: Role;
  }> => {
    const query = `SELECT
      id,
      username,
      metadata,
      roles.name AS role,
    FROM users
    JOIN roles ON users.role_id = roles
    WHERE id = $1;`;
    const values = [userId];

    return await executeQuery(query, values, true);
  },

  getUserByUsername: async (username: string) => {
    const query = `SELECT users.*, roles.name AS role
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE username = $1`;
    const values = [username];

    return await executeQuery(query, values, true);
  },

  getCompeltedQuests: async (userId: number): Promise<Number[]> => {
    const query = `SELECT completed_quests FROM users WHERE id = $1`;
    const values = [userId];

    return await executeQuery(query, values, true);
  },

  getCompletedQuests: async (userId: number): Promise<{
    id: number;
    title: string;
    description: string;
    image_url: string;
    category_name: string;
  }[]> => {
    const query = `SELECT q.id,
      q.title,
      q.description,
      q.image_url,
      c.name AS category_name
    FROM users u
      JOIN quests q ON q.id = ANY(u.completed_quests)
      JOIN categories c ON q.category_id = c.id
    WHERE u.id = $1;`;
    const values = [userId];

    return await executeQuery(query, values);
  },

  completeQuest: async (userId: number, questId: number): Promise<boolean> => {
    const query = `UPDATE users
    SET completed_quests = array_append(completed_quests, $1)
    WHERE id = $2`;
    const values = [questId, userId];

    return await executeQuery(query, values);
  },

  markQuestIncomplete: async (userId: number, questId: number): Promise<boolean> => {
    const query = `UPDATE users
    SET completed_quests = array_remove(completed_quests, $1)
    WHERE id = $2`;
    const values = [questId, userId];

    return await executeQuery(query, values);
  },

  updateSettings: async (userId: number, metadata: any): Promise<boolean> => {
    const query = `UPDATE users
    SET metadata = $1
    WHERE id = $2`;
    const values = [metadata, userId];

    return await executeQuery(query, values);
  },

  updateLastLogin: async (userId: number): Promise<boolean> => {
    const query = `UPDATE users
    SET last_login = NOW(),
        login_count = login_count + 1
    WHERE id = $1`;
    const values = [userId];

    return await executeQuery(query, values);
  }
};