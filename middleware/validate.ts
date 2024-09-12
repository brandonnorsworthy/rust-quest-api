import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateParams = (schema: any) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const { error } = schema.validate(request.params);
    if (error) {
      return response.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export const validateQuery = (schema: any) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const { error } = schema.validate(request.query);
    if (error) {
      return response.status(400).json({ error: error.details[0].message });
    }
    next();
  }
}

export const validateBody = (schema: ObjectSchema) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const { error } = schema.validate(request.body);
    if (error) {
      return response.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};