import express from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/users', userController.getUsers);

export default userRouter;