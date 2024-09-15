import { Request, Response } from "express";
import userService from '../services/user.service';
import authService from '../services/auth.service';
import { token } from "morgan";
import { AuthenticatedRequest } from "../middleware/authenticate";

export default {
  register: async (request: Request, response: Response) => {
    try {
      let { username, password } = request.body;

      username = username.trim();
      password = password.trim();

      const user = await userService.getUserByUsername(username);
      if (user !== null) {
        return response.status(400).json({ error: 'Username already taken' });
      }

      const newUser = await authService.register(username, password);
      if (!newUser) throw new Error('Error creating user during registration');

      const token = await authService.createTokenSession(newUser, password);
      if (!token) throw new Error('Error creating token session');

      return response.status(201).json({ token });
    } catch (error) {
      console.error('Error during register:', error);
      return response.status(500).send('An unexpected error occurred while registering');
    }
  },

  registerGuest: async (request: Request, response: Response) => {
    try {
      let { username, password } = request.body;
      const userId = (request as AuthenticatedRequest).tokenData.userId;

      username = username.trim();
      password = password.trim();

      const existingUser = await userService.getUserById(userId);
      if (!existingUser || existingUser.role !== 'guest') {
        return response.status(401).json({ error: 'Only guests can register through this endpoint' });
      }

      const userWithUsername = await userService.getUserByUsername(username);
      if (userWithUsername !== null) {
        return response.status(400).json({ error: 'Username already taken' });
      }

      const updatedUser = await authService.registerGuest(userId, username, password);
      const token = await authService.createTokenSession(updatedUser, password);
      if (!token) {
        throw new Error('Error creating token session');
      }

      return response.status(200).json({ token });
    } catch (error) {
      console.error('Error during guest registration:', error);
      return response.status(500).send('An unexpected error occurred while registering as a guest');
    }
  },

  login: async (request: Request, response: Response) => {
    try {
      let { username, password } = request.body;
      const errorMessage = 'Invalid username or password';

      username = username.trim();
      password = password.trim();

      const user = await userService.getUserByUsername(username);
      if (user === null) {
        return response.status(400).json({ error: errorMessage });
      }

      const token = await authService.createTokenSession(user, password);
      if (token === null) {
        return response.status(400).json({ error: errorMessage });
      }

      response.status(200).json({ token });

      return userService.updateLastLogin(user.id);
    } catch (error) {
      console.error('Error during login:', error);
      return response.status(500).send('An unexpected error occurred while logging in');
    }
  },

  guestLogin: async (request: Request, response: Response) => {
    try {
      const newUser = await authService.loginGuest();
      const token = await authService.createGuestTokenSession(newUser);

      if (!token) {
        throw new Error('Error creating token session');
      }

      return response.status(201).json({ token });
    } catch (error) {
      console.error('Error during guest login:', error);
      return response.status(500).send('An unexpected error occurred while logging in as guest');
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

      return response.status(200).json({ token });
    } catch (error) {
      console.error('Error during token refresh:', error);
      return response.status(500).send('An unexpected error occurred while refreshing token');
    }
  },
}