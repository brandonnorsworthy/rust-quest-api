import { Request, Response } from "express";
import { executeQuery } from "../database/connection";
import userService from "../services/user.service";
import { AuthenticatedRequest } from "../middleware/authenticate";
import questService from "../services/quest.service";

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

      delete (user.password);
      response.send(user);
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while fetching user');
    }
  },

  completeQuest: async (request: Request, response: Response) => {
    try {
      const { userId } = (request as AuthenticatedRequest).tokenData;
      const { questId } = request.params;

      const quest = await questService.getQuestById(Number(questId));
      if (!quest) {
        return response.status(404).send('Quest not found');
      }

      const completedQuests = await userService.getCompletedQuests(Number(userId));
      if (completedQuests.find((completedQuest) => completedQuest.id === Number(questId))) {
        return response.status(400).send('Quest already completed');
      }

      await userService.completeQuest(Number(userId), Number(questId));

      response.status(201).send('Quest completed');
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while completing quest');
    }
  },

  removeCompletedQuest: async (request: Request, response: Response) => {
    try {
      const { userId } = (request as AuthenticatedRequest).tokenData;
      const { questId } = request.params;

      const quest = await questService.getQuestById(Number(questId));
      if (!quest) {
        return response.status(404).send('Quest not found');
      }

      const completedQuests = await userService.getCompletedQuests(Number(userId));
      if (!completedQuests.find((completedQuest) => completedQuest.id === Number(questId))) {
        return response.status(400).send('Quest not completed');
      }

      await userService.markQuestIncomplete(Number(userId), Number(questId));

      response.send('Quest marked incomplete');
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while marking quest incomplete');
    }
  },

  getCompletedQuests: async (request: Request, response: Response) => {
    try {
      const { userId } = (request as AuthenticatedRequest).tokenData;
      const completedQuests = await userService.getCompletedQuests(Number(userId));

      response.send(completedQuests);
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while fetching completed quests');
    }
  },

  updateSettings: async (request: Request, response: Response) => {
    try {
      const { userId } = (request as AuthenticatedRequest).tokenData;
      const settings = request.body;

      // get user and grab metadata
      const { metadata } = await userService.getUserById(Number(userId));
      console.log(metadata);

      // update metadata with new settings.. spread settings into metadata
      const updatedMetadata = { ...metadata, ...settings };

      console.log(updatedMetadata)
      // save metadata
      await userService.updateSettings(Number(userId), updatedMetadata);

      response.send('Settings updated');
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while updating settings');
    }
  }
}