import { Request, Response } from "express";
import { executeQuery } from "../database/connection";
import userService from "../services/user.service";
import { AuthenticatedRequest } from "../middleware/authenticate";
import questService from "../services/quest.service";

export default {
  getUsers: async (request: Request, response: Response) => {
    try {
      const { page } = request.query;

      const users = await userService.getAllUsers(Number(page));

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
      if (completedQuests?.find((completedQuest) => completedQuest.id === Number(questId))) {
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
      const { userId, metadata } = (request as AuthenticatedRequest).tokenData;
      const settings = request.body;

      const updatedMetadata = { ...metadata, ...settings };
      await userService.updateSettings(Number(userId), updatedMetadata);

      response.send('Settings updated');
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while updating settings');
    }
  },

  resetAllQuests: async (request: Request, response: Response) => {
    try {
      const { userId } = (request as AuthenticatedRequest).tokenData;
      await userService.resetAllQuests(Number(userId));

      response.send('All quests reset');
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while resetting all quests');
    }
  }
}