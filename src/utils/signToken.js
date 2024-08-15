import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config.js';

const signToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

const verifyToken = (token) => {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export { signToken, verifyToken };