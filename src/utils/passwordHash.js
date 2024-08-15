import * as bcrypt from 'bcrypt';
import { BCRYPT_PEPPER as BCRYPT_PEPPER, BCRYPT_SALT_ROUNDS } from '../../config.js';

const hashPassword = async (password) => {
  const pepperedPassword = password + BCRYPT_PEPPER;
  return await bcrypt.hash(pepperedPassword, BCRYPT_SALT_ROUNDS);
};

const comparePassword = async (plaintextPassword, hashedPassword) => {
  const pepperedPassword = plaintextPassword + BCRYPT_PEPPER;
  return await bcrypt.compare(pepperedPassword, hashedPassword);
};

export { hashPassword, comparePassword };
