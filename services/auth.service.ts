import { executeQuery } from "../database/connection";
import Role from "../models/role";
import User, { metadata } from "../models/user";
import { comparePassword, hashPassword } from "../utils/passwordHash";
import { signToken } from "../utils/signToken";
import crypto from 'crypto';

export default {
  register: async (username: string, password: string): Promise<User> => {
    try {
      const passwordHash = await hashPassword(password);
      const queryString = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *
      `;

      return await executeQuery(queryString, [username, passwordHash], true);
    } catch (error) {
      throw new Error('Error during registration');
    }
  },

  registerGuest: async (userId: number, username: string, password: string): Promise<User> => {
    try {
      const passwordHash = await hashPassword(password);

      const queryString = `
        UPDATE users
        SET username = $1, password = $2, role_id = (SELECT id FROM roles WHERE name = 'user' LIMIT 1)
        WHERE id = $3
        RETURNING *
      `;

      const result = await executeQuery(queryString, [username, passwordHash, userId], true);

      if (!result) {
        throw new Error('Failed to update guest user to registered user');
      }

      return result;
    } catch (error) {
      console.error('Error during guest-to-user registration:', error);
      throw new Error('Error during guest registration');
    }
  },

  loginGuest: async (): Promise<User> => {
    try {
      const guestIdentifier = `anon-${crypto.randomBytes(12).toString('hex')}`;

      const queryString = `
        WITH inserted_user AS (
          INSERT INTO users (username, role_id)
          VALUES ($1, (SELECT id FROM roles WHERE name = 'guest' LIMIT 1))
          RETURNING *
          )
        SELECT inserted_user.*, roles.name AS role
        FROM inserted_user
        JOIN roles ON inserted_user.role_id = roles.id
      `;

      const result = await executeQuery(queryString, [guestIdentifier], true);

      if (!result || result.length === 0) {
        throw new Error('Failed to insert guest user');
      }

      return result;
    } catch (error) {
      console.error('Error during guest login:', error);
      throw new Error('Error during guest login');
    }
  },

  createTokenSession: async (user: User, plaintextPassword: string): Promise<string | null> => {
    const passwordsMatch = await comparePassword(plaintextPassword, user.password);

    if (!passwordsMatch) {
      return null;
    }

    const tokenData = { userId: user.id, username: user.username, role: user.role, metadata: user.metadata };
    return signToken(tokenData);
  },

  createGuestTokenSession: async (user: User): Promise<string> => {
    const tokenData = { userId: user.id, username: 'Anonymous', role: user.role, metadata: user.metadata };
    return signToken(tokenData);
  },

  refreshToken: (userId: number, username: string, role: Role, metadata: metadata): string => {
    const tokenData = { userId, username, role, metadata };

    return signToken(tokenData);
  }
}