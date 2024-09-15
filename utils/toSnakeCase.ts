
// Helper function to convert camelCase keys to snake_case for SQL.
export const toSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

// Helper function to convert snake_case keys to camelCase for SQL.
export const toCamelCase = (str: string) => str.replace(/_./g, match => match[1].toUpperCase());