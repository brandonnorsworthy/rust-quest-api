import { executeQuery } from "../database/connection.js";

export default {
  getUsers: async (req, res) => {
    try {
      const users = await executeQuery('SELECT * FROM users');

      if (users.length === 0) {
        res.status(404).send('No users found');
        return;
      }

      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching users');
    }
  }
}