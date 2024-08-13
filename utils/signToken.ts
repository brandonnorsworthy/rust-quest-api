import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const signToken = (payload: any): string => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export { signToken, verifyToken };