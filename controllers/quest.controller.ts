import { Request, Response } from "express";
import questService from '../services/quest.service';
import { AuthenticatedRequest } from "../middleware/authenticate";

export default {
  getAllQuests: async (request: Request, response: Response) => {
    try {
      const { userId } = (request as AuthenticatedRequest).tokenData;
      const { page } = request.query;
      const quests = await questService.getQuests(Number(page), Number(userId));

      if (quests.length === 0) {
        return response.status(404).send('No quests found');
      }

      return response.send(quests);
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while fetching quests');
    }
  },

  getQuest: async (request: Request, response: Response) => {
    try {
      const questId = parseInt(request.params.id);

      const quest = await questService.getQuest(questId);
      if (!quest) {
        return response.status(404).send('Quest not found');
      }

      return response.send(quest);
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while fetching quest');
    }
  },

  getRandomQuest: async (request: Request, response: Response) => {
    try {
      const { userId } = (request as AuthenticatedRequest).tokenData;
      const filters = request.query;
      if (filters) {
        //todo implement filters
        // filters.split(",")
      }

      const randomQuest = await questService.getRandomQuestByUserId(userId);

      return response.send(randomQuest);
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while fetching quest');
    }
  },

  createQuest: async (request: Request, response: Response) => {
    try {
      const { title, description, objectives, categoryId } = request.body;

      const quest = await questService.getQuestByTitle(title);
      if (quest) {
        return response.status(400).send('Quest already exists');
      }

      let { imageUrl } = request.body;
      if (!imageUrl) {
        imageUrl = 'https://via.placeholder.com/150';
      }

      const newQuest = await questService.createQuest(title, description, objectives, imageUrl, categoryId);

      return response.status(201).send(newQuest);
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while creating');
    }
  },

  updateQuest: async (request: Request, response: Response) => {
    try {
      const questId = parseInt(request.params.id);
      const { title, description, objectives, imageUrl, categoryId } = request.body;

      const updatedQuest = await questService.updateQuest(questId, { title, description, objectives, imageUrl, categoryId });
      if (!updatedQuest) {
        return response.status(404).send('Quest not found');
      }

      return response.send(updatedQuest);
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while updating');
    }
  },

  deleteQuest: async (request: Request, response: Response) => {
    try {
      const questId = parseInt(request.params.id);

      const deletedQuest = await questService.deleteQuest(questId);
      if (!deletedQuest || deletedQuest.count === 0) {
        return response.status(404).send('Quest not found');
      }

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while deleting');
    }
  },
};
