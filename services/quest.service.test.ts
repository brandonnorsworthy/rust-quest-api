import { describe, expect, test } from '@jest/globals';
import questService from '../services/quest.service';

describe('Quest Service', () => {
  test('should get all quests', async () => {
    // Arrange
    const page = 1;
    const userId = 1;

    // Act
    const quests = await questService.getQuestsByUserId(page, userId);

    // Assert
    expect(Array.isArray(quests)).toBe(true);
  });

  test('should get a quest by ID', async () => {
    // Arrange
    const questId = 1;

    // Act
    const quest = await questService.getQuestById(questId);

    // Assert
    expect(quest).toBeDefined();
    expect(quest.id).toBe(questId);
  });

  test('should create a new quest', async () => {
    // Arrange
    const title = 'New Quest';
    const description = 'This is a new quest';
    const objectives = ['Objective 1', 'Objective 2'];
    const categoryId = 1;
    const userId = 1;

    // Act
    const createdQuest = await questService.createQuest(
      title,
      description,
      objectives,
      categoryId,
      userId
    );

    // Assert
    expect(createdQuest).toBeDefined();
    expect(createdQuest.title).toBe(title);
    expect(createdQuest.description).toBe(description);
    expect(createdQuest.objectives).toEqual(objectives);
    expect(createdQuest.category_id).toBe(categoryId);
    expect(createdQuest.suggested_by).toBe(userId);
  });

  test('should get a quest by title', async () => {
    // Arrange
    const title = 'Sample Quest';
    const description = 'This is a new quest';
    const objectives = ['Objective 1', 'Objective 2'];
    const categoryId = 1;
    const userId = 1;

    // Act
    const createdQuest = await questService.createQuest(
      title,
      description,
      objectives,
      categoryId,
      userId
    );

    const quest = await questService.getQuestByTitle(title);

    // Assert
    expect(quest).toBeDefined();
    expect(quest.title).toBe(title);
  });

  test('should update a quest', async () => {
    // Arrange
    const questId = 2;
    const userId = 2;
    const updatedParams = {
      title: 'Updated Quest',
      description: 'This quest has been updated',
      objectives: ['New Objective'],
      imageUrl: 'https://example.com/updated-image.jpg',
      categoryId: 2,
    };

    // Act
    const updatedQuest = await questService.updateQuest(questId, userId, updatedParams);

    // Assert
    expect(updatedQuest).toBeDefined();
    expect(updatedQuest.id).toBe(questId);
    expect(updatedQuest.updated_by).toBe(userId);
    expect(updatedQuest.updated_at).not.toBeNull();
    expect(updatedQuest.title).toBe(updatedParams.title);
    expect(updatedQuest.description).toBe(updatedParams.description);
    expect(updatedQuest.objectives).toEqual(updatedParams.objectives);
    expect(updatedQuest.image_url).toBe(updatedParams.imageUrl);
    expect(updatedQuest.category_id).toBe(updatedParams.categoryId);
  });

  test('should delete a quest', async () => {
    // Arrange
    const questId = 1;
    const userId = 1;

    // Act
    await questService.deleteQuest(questId, userId);
    const deletedQuest = await questService.getQuestById(questId);

    // Assert
    expect(deletedQuest.soft_deleted).toBe(true);
    expect(deletedQuest.deleted_by).toBe(userId);
    expect(deletedQuest.updated_at).not.toBeNull();
  });
});