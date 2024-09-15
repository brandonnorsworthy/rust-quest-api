import { describe, expect, test } from '@jest/globals';
import { toSnakeCase, toCamelCase } from './toSnakeCase';

describe('toSnakeCase', () => {
  test('converts camelCase to snake_case', () => {
    // Arrange
    const input = 'camelCaseString';
    const expectedOutput = 'camel_case_string';

    // Act
    const result = toSnakeCase(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  test('handles strings with no uppercase letters', () => {
    // Arrange
    const input = 'snake_case_string';
    const expectedOutput = 'snake_case_string';

    // Act
    const result = toSnakeCase(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  test('handles empty strings', () => {
    // Arrange
    const input = '';
    const expectedOutput = '';

    // Act
    const result = toSnakeCase(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  test('handles strings with consecutive uppercase letters', () => {
    // Arrange
    const input = 'camelCaseStringWithConsecutiveUppercase';
    const expectedOutput = 'camel_case_string_with_consecutive_uppercase';

    // Act
    const result = toSnakeCase(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });
});

describe('toCamelCase', () => {
  test('converts snake_case to camelCase', () => {
    // Arrange
    const input = 'snake_case_string';
    const expectedOutput = 'snakeCaseString';

    // Act
    const result = toCamelCase(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  test('handles strings with no underscores', () => {
    // Arrange
    const input = 'camelCaseString';
    const expectedOutput = 'camelCaseString';

    // Act
    const result = toCamelCase(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  test('handles empty strings', () => {
    // Arrange
    const input = '';
    const expectedOutput = '';

    // Act
    const result = toCamelCase(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });
});