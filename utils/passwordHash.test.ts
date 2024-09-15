import { describe, expect, test } from '@jest/globals';
import { hashPassword, comparePassword } from '../utils/passwordHash';

describe('passwordHash', () => {
  describe('hashPassword', () => {
    test('should hash the password', async () => {
      // Arrange
      const password = 'password123';

      // Act
      const hashedPassword = await hashPassword(password);

      // Assert
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toEqual(password);
    });
  });

  describe('comparePassword', () => {
    test('should return true for matching passwords', async () => {
      // Arrange
      const password = 'password123';
      const hashedPassword = await hashPassword(password);

      // Act
      const result = await comparePassword(password, hashedPassword);

      // Assert
      expect(result).toBe(true);
    });

    test('should return false for non-matching passwords', async () => {
      // Arrange
      const password = 'password123';
      const wrongPassword = 'wrongpassword';
      const hashedPassword = await hashPassword(password);

      // Act
      const result = await comparePassword(wrongPassword, hashedPassword);

      // Assert
      expect(result).toBe(false);
    });
  });
});