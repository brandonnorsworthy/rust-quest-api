import { describe, expect, test } from '@jest/globals';
import userService from '../services/user.service';

describe('User Service', () => {
  test('should get all users', async () => {
    // Arrange
    const page = 1;

    // Act
    const result = await userService.getAllUsers(page);

    // Assert
    expect(result).toBeDefined();
  });

  test('should get user by username', async () => {
    // Arrange
    const username = 'example';

    // Act
    const result = await userService.getUserByUsername(username);

    // Assert
    expect(result).toBeDefined();
  });

  test('should get completed quests for a user', async () => {
    // Arrange
    const userId = 1;

    // Act
    const result = await userService.getCompletedQuests(userId);

    // Assert
    expect(result).toBeDefined();
  });

  test('should complete a quest for a user', async () => {
    // Arrange
    const userId = 1;
    const questId = 1;

    // Act
    const result = await userService.completeQuest(userId, questId);

    // Assert
    expect(result).toBeDefined();
  });
});