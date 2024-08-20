import { Request, Response } from "express";
import questService from '../services/quest.service';

export default {
  getQuests: async (request: Request, response: Response) => {
    try {
      const quests = await questService.getQuests();

      if (quests.length === 0) {
        return response.status(404).send('No quests found');
      }

      return response.send(quests);
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while fetching users');
    }
  }
};
