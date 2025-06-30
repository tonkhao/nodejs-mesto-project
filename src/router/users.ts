import { Router } from 'express';
import {
  createUser, getUserById, getUsers, updateAvatar, updateUser,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:userId', getUserById);

userRouter.post('/', createUser);

userRouter.patch('/:userId', updateUser);

userRouter.patch('/:userId/updateAvatar', updateAvatar);

export default userRouter;
