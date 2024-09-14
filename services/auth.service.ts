import { executeQuery } from "../database/connection";
import Role from "../models/role";
import User, { metadata } from "../models/user";
import { comparePassword, hashPassword } from "../utils/passwordHash";
import { signToken } from "../utils/signToken";

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

  createTokenSession: async (user: User, plaintextPassword: string): Promise<string | null> => {
    const passwordsMatch = await comparePassword(plaintextPassword, user.password);

    if (!passwordsMatch) {
      return null;
    }

    const tokenData = { userId: user.id, username: user.username, role: user.role, metadata: user.metadata };
    return signToken(tokenData);
  },

  refreshToken: (userId: number, username: string, role: Role, metadata: metadata): string => {
    const tokenData = { userId, username, role, metadata };

    return signToken(tokenData);
  }
}