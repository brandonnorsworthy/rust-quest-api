import { executeQuery } from "../database/connection";
import { comparePassword, hashPassword } from "../utils/passwordHash";
import { signToken } from "../utils/signToken";

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

export default {
  register: async (username: string, password: string) => {
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


  createTokenSession: async (user: User, plaintextPassword: string) => {
    const passwordsMatch = await comparePassword(plaintextPassword, user.password);

    if (!passwordsMatch) {
      return null;
    }

    const tokenData = { id: user.id, username: user.username, role: user.role };
    return signToken(tokenData);
  }
}