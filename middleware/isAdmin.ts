import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authenticate';

const isAdmin = (request: Request, response: Response, next: NextFunction) => {
  console.log((request as AuthenticatedRequest).tokenData)
  const { role } = (request as AuthenticatedRequest).tokenData;

  if (!role) {
    return response.status(401).json({ error: 'Access denied, \"role\" missing.' });
  }

  if (role !== 'admin') {
    return response.status(403).json({ error: 'Access denied, Admins only.' });
  }

  return next();
};

export default isAdmin;
