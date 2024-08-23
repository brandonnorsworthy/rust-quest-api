import { describe, expect, test } from '@jest/globals';
import { signToken, verifyToken } from '../utils/signToken';

describe('signToken', () => {
  test('should return a signed token', () => {
    // Arrange
    const payload = { userId: 123 };

    // Act
    const token = signToken(payload);

    // Assert
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });
});

describe('verifyToken', () => {
  test('should return true for a valid token', () => {
    // Arrange
    const payload = { userId: 123 };
    const token = signToken(payload);

    // Act
    const isValid = verifyToken(token);

    // Assert
    expect(isValid).toBe(true);
  });

  test('should return false for an invalid token', () => {
    // Arrange
    const token = 'invalid_token';

    // Act
    const isValid = verifyToken(token);

    // Assert
    expect(isValid).toBe(false);
  });
});