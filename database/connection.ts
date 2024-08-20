import { Pool } from 'pg';
import { DATABASE } from '../config';

let pool = null;

if (DATABASE.CONNECTION_STRING) {
  pool = new Pool({
    connectionString: DATABASE.CONNECTION_STRING,
  });
} else if (DATABASE.USER && DATABASE.HOST && DATABASE.DATABASE && DATABASE.PASSWORD && DATABASE.PORT) {
  pool = new Pool({
    user: DATABASE.USER,
    host: DATABASE.HOST,
    database: DATABASE.DATABASE,
    password: DATABASE.PASSWORD,
    port: parseInt(DATABASE.PORT, 10),
  });
} else {
  throw new Error('No Database Configuration Found');
}

/**
 * Executes a query against the database.
 * @param queryString SQL query string that gets processed, should contain no user-generated content.
 * @param queryValues List of all dynamic parameters for the SQL Query.
 * @param expectSingleRow If true, will return the first row of the result; otherwise, will return all rows.
 * @returns A Promise that resolves to the result of the query.
 */
export const executeQuery = async (queryString: string, queryValues: any[] = [], expectSingleRow: boolean = false): Promise<any[] | any> => {
  try {
    const result = await pool.query(queryString, queryValues);

    if (!result || !result.rows || result.rows.length === 0) {
      if (['DELETE', 'INSERT', 'UPDATE'].includes(result.command)) {
        return { count: result.rowCount };
      }
      return null;
    }

    return expectSingleRow ? result.rows[0] : result.rows;
  } catch (error: any) {
    throw new Error(`Error executing query: ${error.message} | Query: ${queryString}`);
  }
};