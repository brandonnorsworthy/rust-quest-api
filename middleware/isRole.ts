import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authenticate';

export const isModerator = (request: Request, response: Response, next: NextFunction) => {
  const { role } = (request as AuthenticatedRequest).tokenData;

  if (!role) {
    return response.status(401).json({ error: 'Access denied, \"role\" missing.' });
  }

  if (role !== "admin" && role !== "moderator") {
    return response.status(403).json({ error: 'Access denied, Admins only.' });
  }

  return next();
};

export const isAdmin = (request: Request, response: Response, next: NextFunction) => {
  const { role } = (request as AuthenticatedRequest).tokenData;

  if (!role) {
    return response.status(401).json({ error: 'Access denied, \"role\" missing.' });
  }

  if (role !== "admin") {
    return response.status(403).json({ error: 'Access denied, Admins only.' });
  }

  return next();
};