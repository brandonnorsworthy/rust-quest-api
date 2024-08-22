import { Request, Response } from "express";
import { executeQuery } from "../database/connection";
import userService from "../services/user.service";

export default {
  getUsers: async (request: Request, response: Response) => {
    try {
      const users = await userService.getAllUsers();

      if (users.length === 0) {
        response.status(404).send('No users found');
        return;
      }

      response.send(users);
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while fetching users');
    }
  },

  getUserByUsername: async (request: Request, response: Response) => {
    try {
      const { username } = request.params;
      const user = await userService.getUserByUsername(username);

      if (!user) {
        response.status(404).send('User not found');
        return;
      }

      response.send(user);
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while fetching user');
    }
  },

  getCompletedQuests: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const completedQuests = await userService.getCompletedQuests(parseInt(id));

      response.send(completedQuests);
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while fetching completed quests');
    }
  },
}