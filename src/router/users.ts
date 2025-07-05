import { Router } from 'express';
import {
  getUserById, getUsers, updateAvatar, updateUser, getUserInfo,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/me', getUserInfo);

userRouter.get('/:userId', getUserById);

userRouter.patch('/me', updateUser);

userRouter.patch('/me/updateAvatar', updateAvatar);

export default userRouter;
