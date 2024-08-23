import 'dotenv/config'
import connectionPool from '../database/connection'
import { Pool } from 'pg';
import { beforeAll, beforeEach, afterEach, afterAll } from '@jest/globals';

let pool: Pool;

beforeAll(() => {
  pool = connectionPool
});

beforeEach(async () => {
  await pool.query('BEGIN');
});

afterEach(async () => {
  await pool.query('ROLLBACK');
});

afterAll(async () => {
  await pool.end();
});

