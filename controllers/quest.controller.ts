import { Request, Response } from "express";
import questService from "../services/quest.service";

export default {
  getQuests: async (req: Request, res: Response) => {
    try {
      const quests = await questService.getQuests();

      if (quests.length === 0) {
        res.status(404).send('No quests found');
        return;
      }

      res.send(quests);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching users');
    }
  }
}