import { Request, Response } from "express";

import userService from '../services/user.service';
import authService from '../services/auth.service';

export default {
  register: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
      const user = await userService.getUser(username);

      if (user.length === 1) {
        res.status(400).json({ error: 'Username already taken' });
        return;
      }

      const newUser = authService.register(username, password);

      //! return jwt token
      res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}