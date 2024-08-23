import { describe, expect, test } from '@jest/globals';
import suggestionService from '../services/suggestion.service';

describe('Suggestion Service', () => {
  test('getSuggestions should return an array of suggestions', async () => {
    // Arrange

    // Act
    const suggestions = await suggestionService.getSuggestions();

    // Assert
    expect(Array.isArray(suggestions)).toBe(true);
  });

  test('createSuggestion should create a new suggestion', async () => {
    // Arrange
    const userId = '1';
    const title = 'New Suggestion';
    const description = 'This is a new suggestion';

    // Act
    const result = await suggestionService.createSuggestion(userId, title, description);

    // Assert
    expect(result).toBeDefined();
    // Add additional assertions based on the expected behavior of createSuggestion
  });
});