import { Request, Response } from "express";
import userService from '../services/user.service';
import authService from '../services/auth.service';
import { token } from "morgan";
import { AuthenticatedRequest } from "../middleware/authenticate";

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
      const errorMessage = 'Invalid username or password';

      if (user === null) {
        return response.status(400).json({ error: errorMessage });
      }

      const token = await authService.createTokenSession(user, password);
      if (token === null) {
        return response.status(400).json({ error: errorMessage });
      }

      response.status(200).json({ token });

      userService.updateLastLogin(user.id);
    } catch (error) {
      console.error('Error during login:', error);
      return response.status(500).send('An unexpected error occurred while logging in');
    }
  },

  token: async (request: Request, response: Response) => {
    try {
      const { userId } = (request as AuthenticatedRequest).tokenData;

      const { username, role, metadata } = await userService.getUserById(userId);
      const token = authService.refreshToken(userId, username, role, metadata);

      if (!token) {
        return response.status(400).json({ error: 'Invalid refresh token' });
      }

      response.status(200).json({ token });
    } catch (error) {
      console.error('Error during token refresh:', error);
      return response.status(500).send('An unexpected error occurred while refreshing token');
    }
  },
}