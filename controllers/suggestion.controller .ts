import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticate";
import suggestionService from "../services/suggestion.service";

export default {
  getSuggestions: async (request: Request, response: Response) => {
    try {
      const suggestions = await suggestionService.getSuggestions();

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
      const { title, description } = request.body;
      const { userId } = (request as AuthenticatedRequest).tokenData;

      await suggestionService.createSuggestion(userId, title, description);

      return response.status(201).send('Suggestion created');
    } catch (error) {
      console.error(error);
      return response.status(500).send('An error occurred while creating the suggestion');
    }
  }
};
