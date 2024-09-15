import { describe, expect, test } from '@jest/globals';
import { minutesToMs, msToMinutes } from './minutesToMs';

describe('minutesToMs', () => {
  test('should convert minutes to milliseconds correctly', () => {
    // Arrange
    const minutes = 5;
    const expectedMs = 300000;

    // Act
    const result = minutesToMs(minutes);

    // Assert
    expect(result).toBe(expectedMs);
  });

  test('should return 0 when input is 0', () => {
    // Arrange
    const minutes = 0;
    const expectedMs = 0;

    // Act
    const result = minutesToMs(minutes);

    // Assert
    expect(result).toBe(expectedMs);
  });

  test('should handle negative minutes', () => {
    // Arrange
    const minutes = -5;
    const expectedMs = -300000;

    // Act
    const result = minutesToMs(minutes);

    // Assert
    expect(result).toBe(expectedMs);
  });
});

describe('msToMinutes', () => {
  test('should convert milliseconds to minutes correctly', () => {
    // Arrange
    const ms = 300000;
    const expectedMinutes = 5;

    // Act
    const result = msToMinutes(ms);

    // Assert
    expect(result).toBe(expectedMinutes);
  });

  test('should return 0 when input is 0', () => {
    // Arrange
    const ms = 0;
    const expectedMinutes = 0;

    // Act
    const result = msToMinutes(ms);

    // Assert
    expect(result).toBe(expectedMinutes);
  });

  test('should handle negative milliseconds', () => {
    // Arrange
    const ms = -300000;
    const expectedMinutes = -5;

    // Act
    const result = msToMinutes(ms);

    // Assert
    expect(result).toBe(expectedMinutes);
  });
});