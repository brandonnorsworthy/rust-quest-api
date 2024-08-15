import { Request, Response } from 'express';
import questService from '../services/quest.service';

export default {
  getQuests: async (req, res) => {
    try {
      const quests = await questService.getQuests();

      if (quests.length === 0) {
        return res.status(404).send('No quests found');
      }

      return res.send(req.user);
    } catch (error) {
      console.error(error);
      return res.status(500).send('An error occurred while fetching users');
    }
  }
};
