import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import Role from '../models/role';
import { metadata } from '../models/user';

interface DecodedJWT {
  userId: number;
  username: string;
  role: Role;
  iat: number;
  metadata: metadata;
}

export interface AuthenticatedRequest extends Request {
  tokenData: DecodedJWT;
}

const authenticate = (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedJWT;

    if (!decoded) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    (request as AuthenticatedRequest).tokenData = { ...decoded };

    next();
  } catch (error) {
    return response.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticate;
