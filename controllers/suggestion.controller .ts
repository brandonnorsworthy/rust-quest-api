import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticate";
import suggestionService from "../services/suggestion.service";
import questService from "../services/quest.service";

export default {
  getSuggestions: async (request: Request, response: Response) => {
    try {
      const { page } = request.query;

      const suggestions = await suggestionService.getSuggestions(Number(page));

      if (!suggestions || suggestions.length === 0) {
        return response.status(404).send('No suggestions found');
      }

      return response.send(suggestions);
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while retrieving suggestions');
    }
  },

  createSuggestion: async (request: Request, response: Response) => {
    try {
      let { title, description } = request.body;
      const { userId } = (request as AuthenticatedRequest).tokenData;

      title = title.trim();
      description = description.trim();

      await suggestionService.createSuggestion(userId, title, description);

      return response.status(201).send('Suggestion created');
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while creating the suggestion');
    }
  },

  convertSuggestionIntoQuest: async (request: Request, response: Response) => {
    try {
      const { userId } = (request as AuthenticatedRequest).tokenData;
      const { suggestionId } = request.params;
      let { objectives, categoryId } = request.body;

      objectives = objectives.map((objective: string) => objective.trim());

      const suggestion = await suggestionService.getSuggestionById(Number(suggestionId));

      if (!suggestion) {
        return response.status(404).send('Suggestion not found');
      }

      const newQuest = await questService.createQuest(suggestion.title, suggestion.description, objectives, categoryId, suggestion.user_id);
      await suggestionService.deleteSuggestion(Number(suggestionId), userId);

      return response.send(newQuest);
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while converting the suggestion into a quest');
    }
  }
};
