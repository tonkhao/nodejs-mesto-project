import { Router } from 'express';
import {
  getUserById, getUsers, updateAvatar, updateUser, getUserInfo,
} from '../controllers/user';
import { validateUpdateAvatar, validateUpdateProfile, validateUserId } from '../validators/celebrateValidators';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/me', getUserInfo);

userRouter.get('/:userId', validateUserId, getUserById);

userRouter.patch('/me', validateUpdateProfile, updateUser);

userRouter.patch('/me/updateAvatar', validateUpdateAvatar, updateAvatar);

export default userRouter;
