import { Request, Response } from "express";

import userService from '../services/user.service';
import authService from '../services/auth.service';

export default {
  register: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await userService.getUserByUsername(username);

      if (user !== null) {
        return res.status(400).json({ error: 'Username already taken' });
      }

      const newUser = await authService.register(username, password);

      const token = await authService.createTokenSession(newUser, password);
      if (token === null) {
        return res.status(400).json({ error: 'Issue creating token' });
      }

      return res.status(201).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await userService.getUserByUsername(username);

      if (user === null) {
        return res.status(400).json({ error: 'User not found' });
      }

      const token = await authService.createTokenSession(user, password);
      if (token === null) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}