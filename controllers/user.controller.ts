import { Request, Response } from "express";
import { executeQuery } from "../database/connection";

export default {
  getUsers: async (request: Request, response: Response) => {
    try {
      const users = await executeQuery('SELECT * FROM users');

      console.log(users)

      if (users.length === 0) {
        response.status(404).send('No users found');
        return;
      }

      response.send(users);
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while fetching users');
    }
  }
}