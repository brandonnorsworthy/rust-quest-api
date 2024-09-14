import { Request, Response } from "express";
import userService from '../services/user.service';
import authService from '../services/auth.service';

export default {
  register: async (request: Request, response: Response) => {
    try {
      const { username, password } = request.body;

      const user = await userService.getUserByUsername(username);

      if (user !== null) {
        return response.status(400).json({ error: 'Username already taken' });
      }

      const newUser = await authService.register(username, password);
      const token = await authService.createTokenSession(newUser, password);

      if (!token) throw new Error('Error creating token session');

      return response.status(201).json({ token });
    } catch (error) {
      console.error('Error during register:', error);
      return response.status(500).send('An unexpected error occurred while registering');
    }
  },

  login: async (request: Request, response: Response) => {
    try {
      const { username, password } = request.body;

      const user = await userService.getUserByUsername(username);

      if (user === null) {
        return response.status(400).json({ error: 'User not found' });
      }

      const token = await authService.createTokenSession(user, password);
      if (token === null) {
        return response.status(400).json({ error: 'Invalid password' });
      }

      response.status(200).json({ token });

      userService.updateLastLogin(user.id);
    } catch (error) {
      console.error('Error during login:', error);
      return response.status(500).send('An unexpected error occurred while logging in');
    }
  }
}