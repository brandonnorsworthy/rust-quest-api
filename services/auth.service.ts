import { executeQuery } from "../database/connection";
import { comparePassword, hashPassword } from "../utils/passwordHash";
import { signToken } from "../utils/signToken";

interface User {
  id: number;
  username: string;
  password: string;
}

export default {
  register: async (username: string, password: string) => {
    try {
      const passwordHash = await hashPassword(password);
      executeQuery('INSERT INTO users (username, password) VALUES ($1, $2)', [username, passwordHash]);
    } catch (error) {
      throw new Error('Error during registration');
    }
  },

  createTokenSession: async (user: User, plaintextPassword: string) => {
    const passwordsMatch = await comparePassword(plaintextPassword, user.password);

    if (!passwordsMatch) {
      return null;
    }

    return signToken({ id: user.id, username: user.username });
  }
}